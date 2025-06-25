import styles from './Left.module.css'
import Button from './Button/Button.jsx';
import Photo from './Photo/Photo.jsx';
import Frame from './Frame/Frame.jsx';
import Filter from './Filter/Filter.jsx';
import Search from './Search/Search.jsx';
import Auth from './Auth/Auth.jsx';

function Left() {
  const filterOptions = [
    { value: 'Australia', label: 'Австралийская кухня' },
    { value: 'Austria', label: 'Австрийская кухня' },
    { value: 'Author', label: 'Авторская кухня' },
    { value: 'Azerbaijan', label: 'Азербайджанская кухня' },
    { value: 'America', label: 'Американская кухня' },
    { value: 'Armenia', label: 'Армянская кухня' },
    { value: 'Belarus', label: 'Белорусская кухня' },
    { value: 'Belgium', label: 'Бельгийская кухня' },
    { value: 'Bulgaria', label: 'Болгарская кухня' },
    { value: 'Britannia', label: 'Британская кухня' },
    { value: 'Vegetarian', label: 'Вегетарианская кухня' },
    { value: 'Holland', label: 'Голландская кухня' },
    { value: 'Greece', label: 'Греческая кухня' },
    { value: 'Georgia', label: 'Грузинская кухня' },
    { value: 'Denmark', label: 'Датская кухня' },
    { value: 'Jewish', label: 'Еврейская кухня' },
    { value: 'Europe', label: 'Европейская кухня' },
    { value: 'India', label: 'Индийская кухня' },
    { value: 'Ireland', label: 'Ирландская кухня' },
    { value: 'Spain', label: 'Испанская кухня' },
    { value: 'Italy', label: 'Итальянская кухня' },
    { value: 'Caucasus', label: 'Кавказская кухня' },
    { value: 'China', label: 'Китайская кухня' },
    { value: 'Colombia', label: 'Колумбийская кухня' },
    { value: 'Mexico', label: 'Мексиканская кухня' },
    { value: 'World', label: 'Мировая кухня' },
    { value: 'Germany', label: 'Немецкая кухня' },
    { value: 'Pan-Asian', label: 'Паназиатская кухня' },
    { value: 'Russia', label: 'Русская кухня' },
    { value: 'Scandinavia', label: 'Скандинавская кухня' },
    { value: 'Mediterranean', label: 'Средиземноморская кухня' },
    { value: 'Thailand', label: 'Тайская кухня' },
    { value: 'Tatarstan', label: 'Татарская кухня' },
    { value: 'Turkey', label: 'Турецкая кухня' },
    { value: 'Uzbekistan', label: 'Узбекская кухня' },
    { value: 'France', label: 'Французская кухня' },
    { value: 'Czech Republic', label: 'Чешская кухня' },
    { value: 'Scotland', label: 'Шотландская кухня' },
    { value: 'Estonia', label: 'Эстонская кухня' },
    { value: 'Yugoslavia', label: 'Югославская кухня' },
    { value: 'Japan', label: 'Японская кухня' },
  ];

  return (
    <div className={styles.left}>
        <Filter options={filterOptions}></Filter>
    </div>
  );
}

export default Left;
