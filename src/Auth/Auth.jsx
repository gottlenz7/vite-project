import { useState, useCallback } from 'react';
import styles from './Auth.module.css'; 

function Auth({ onLogin, onRegister }) {
  const [authMode, setAuthMode] = useState('login'); 
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: ''
  });


  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (authMode === 'login') {
      onLogin(formData.email, formData.password);
    } else {
      onRegister(formData.username, formData.email, formData.password);
    }
  }, [authMode, formData, onLogin, onRegister]);


  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({prev, [name]: value }));
  });


  const toggleAuthMode = useCallback(() => {
    setAuthMode(prev => prev === 'login' ? 'register' : 'login');
  });


  return (
    <form onSubmit={handleSubmit} className={styles.auth}>
      <h3>{authMode === 'login' ? 'Вход' : 'Регистрация'}</h3>
      
      {authMode === 'register' && (
        <input className={styles['auth-input']}
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Имя пользователя"
          required/>
      )}

      <input className={styles['auth-input']}
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        required/>

      <input className={styles['auth-input']}
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Пароль"
        required/>

      <button className={styles['auth-button']} type="submit">
        {authMode === 'login' ? 'Войти' : 'Зарегистрироваться'}
      </button>

      <button className={styles['auth-button']}
        type="button"
        onClick={toggleAuthMode}>
        {authMode === 'login' ? 'Нет аккаунта? Зарегистрироваться' : 'Уже есть аккаунт? Войти'}
      </button>
    </form>
  );
}

export default Auth;
