import styles from './Header.module.css'
import Button from './Button/Button.jsx';
import Filter from './Filter/Filter.jsx';
import Search from './Search/Search.jsx';
import Auth from './Auth/Auth.jsx';

function Header() {
  return (
    <header>
      <div className={styles.left}>
        <img className={styles['img-header']} src='https://cdn-icons-png.flaticon.com/512/5403/5403020.png'/>
        <Button text='главная'></Button>
        <Button text='рецепты'></Button>
        <Button text='мои рецепты'></Button>
      </div>

      <div className={styles.right}>
        {/* <Search></Search> */}
        <Button text='регестрация'></Button>
      </div>
    </header>
  );
}

export default Header;
