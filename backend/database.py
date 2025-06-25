import csv
from models import Recipe, get_db 

def recipes_from_csv(csv_path: str):
    db = next(get_db())
    
    with open(csv_path, 'r', encoding='utf-8-sig') as f:
        reader = csv.DictReader(f, delimiter=';')
        
        for row in reader:
            recipe = Recipe(
                name = row['name'],
                recipe = row['recipe'], 
                ingredients = row['ingredients'],
                country = row['country'],
                time = row['time']
            )
            db.add(recipe)
    
    db.commit()

if __name__ == "__main__":
    csv_path = 'C:/Users/Valeriia/Desktop/web/vite-project/backend/recipes.csv'
    recipes_from_csv(csv_path)
    