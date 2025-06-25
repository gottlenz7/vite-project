import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import styles from './Index.module.css'
import App from './App.jsx'
import Header from './Header.jsx'
import Left from './Left.jsx'
import Right from './Right.jsx'
import Central from './Central.jsx'
import Profile from './Profile.jsx'
import Favorite from './Favorite.jsx'
import Details from './Details.jsx'
import Router from './router.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Header />
    {/* <div className={styles.main}>
      <Left />
      <Right />
    </div> */}
    {/* <Central /> */}
    {/* <Profile /> */}
    {/* <Favorite /> */}
    {/* <Details /> */}
    {/* <App /> */}
  </StrictMode>,
)
