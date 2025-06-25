import styles from './Details.module.css'
import Button from './Button/Button.jsx';
import Photo from './Photo/Photo.jsx';
import Frame from './Frame/Frame.jsx';
import Filter from './Filter/Filter.jsx';
import Search from './Search/Search.jsx';
import Auth from './Auth/Auth.jsx';

function Profile() {

  const handleLogin = (email, password) => {
    alert(`вход: ${email}`)
  };

  const handleRegister = (username, email, password) => {
    alert(`регистрация: ${email}`)
  };

  return (
    <div className={styles.details}>
      <h2>sdfsd</h2>
      <span>sdfgh</span>
      <span>sdfsdf</span>
      <span>sadsd</span>
    </div>
  );
}

export default Profile;
