from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pydantic import BaseModel, EmailStr
from datetime import datetime, timedelta
from jose import JWTError, jwt
from passlib.context import CryptContext
from typing import Optional
from sqlalchemy.orm import Session
from models import User, Recipe, Favorite, get_db, create_db

SECRET_KEY = "sfzdhxgj" 
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

app = FastAPI()

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

class UserCreate(BaseModel):
    username: str
    password: str  
    email: EmailStr
    is_admin: bool = False

class UserResponse(BaseModel):
    id: int
    username: str
    email: str
    is_admin: bool

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None

class RecipeCreate(BaseModel):
    name: str
    recipe: str
    ingredients: str
    time: str
    country: str

def verify_password(plain_password, password):
    return pwd_context.verify(plain_password, password)

def get_password_hash(password):
    return pwd_context.hash(password)

def authenticate_user(db: Session, username: str, password: str):
    user = db.query(User).filter(User.username == username).first()

    if not user or not verify_password(password, user.password):
        return False
    
    return user

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()

    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)

    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

    return encoded_jwt


async def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = TokenData(username=username)
    except JWTError:
        raise credentials_exception
    
    user = db.query(User).filter(User.username == token_data.username).first()
    if user is None:
        raise credentials_exception
    
    return user


async def active_admin(current_user: User = Depends(get_current_user)):
    if not current_user.is_admin:
        raise HTTPException(status_code=403, detail="Not enough privileges")
    
    return current_user


@app.on_event("startup")
def on_startup():
    create_db()


@app.post("/signup", response_model=Token)
async def signup(user_data: UserCreate, db: Session = Depends(get_db)):
    if db.query(User).filter(User.email == user_data.email).first():
        raise HTTPException(status_code=400, detail="Username or email already registered")
    
    user = User(
        username=user_data.username,
        email=user_data.email,
        password=get_password_hash(user_data.password), 
        is_admin=user_data.is_admin
    )
    
    db.add(user)
    db.commit()
    db.refresh(user)
    
    access_token = create_access_token(data={"sub": user.username})
    return {"access_token": access_token, 
            "token_type": "bearer"}


@app.post("/signin", response_model=Token)
async def signin(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(data={"sub": user.username}, expires_delta=access_token_expires)
    
    return {"access_token": access_token, 
            "token_type": "bearer"}


@app.post("/recipes/")
async def create_recipe(
    recipe_data: RecipeCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
    ):
    
    db_recipe = Recipe(
        **recipe_data.dict(),
    )
    
    db.add(db_recipe)
    db.commit()
    db.refresh(db_recipe)
    return db_recipe


@app.get("/recipes/")
async def read_recipes(country: Optional[str] = None, db: Session = Depends(get_db), limit: int = 100):
    query = db.query(Recipe)
    
    if country:
        query = query.filter(Recipe.country == country)
    
    recipes = query.limit(limit).all()
    return recipes


@app.get("/recipes/{recipe_id}")
async def read_recipe(recipe_id: int, db: Session = Depends(get_db)):
    recipe = db.query(Recipe).filter(Recipe.id == recipe_id).first()

    if not recipe:
        raise HTTPException(status_code=404, detail="Recipe not found")
    
    return recipe


@app.put("/recipes/{recipe_id}")
async def update_recipe(recipe_id: int, recipe_data: RecipeCreate, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    db_recipe = db.query(Recipe).filter(Recipe.id == recipe_id).first()
    if not db_recipe:
        raise HTTPException(status_code=404, detail="Recipe not found")
    
    if not current_user.is_admin:
        raise HTTPException(status_code=403, detail="Not enough privileges")
    
    for key, value in recipe_data.dict().items():
        setattr(db_recipe, key, value)
    
    db.commit()
    db.refresh(db_recipe)

    return db_recipe


@app.delete("/recipes/{recipe_id}")
async def delete_recipe(recipe_id: int, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    db_recipe = db.query(Recipe).filter(Recipe.id == recipe_id).first()
    if not db_recipe:
        raise HTTPException(status_code=404, detail="Recipe not found")
    
    if db_recipe.author_id != current_user.id and not current_user.is_admin:
        raise HTTPException(status_code=403, detail="Not enough privileges")
        
    db.delete(db_recipe)
    db.commit()

    return {"message": "Recipe deleted"}


@app.post("/recipes/{recipe_id}/favorite")
async def add_to_favorites(recipe_id: int, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    recipe = db.query(Recipe).filter(Recipe.id == recipe_id).first()
    if not recipe:
        raise HTTPException(status_code=404, detail="Recipe not found")
    
    favorite = Favorite(
        user_id=current_user.id,
        recipe_id=recipe_id
    )
    
    db.add(favorite)
    db.commit()

    return {"message": "Recipe added to favorites"}
