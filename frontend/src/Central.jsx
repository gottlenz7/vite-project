import styles from './Central.module.css'
import Button from './Button/Button.jsx';
import Photo from './Photo/Photo.jsx';
import Frame from './Frame/Frame.jsx';
import Filter from './Filter/Filter.jsx';
import Search from './Search/Search.jsx';
import Auth from './Auth/Auth.jsx';

function Right() {

  return (
    <div className={styles.central}>
        <Frame>
        <Photo src="https://cafebrynza.ru/images/articles/5-poleznykh-svojstv-goryachej-edy_66a272bd082bc.png"/>
        
        <span>о еда</span>
        
        <Button text='кнопка' onClick={() => alert('кнопка успешно нажата')}>
        </Button>
      </Frame>
    </div>
  );
}

export default Right;
