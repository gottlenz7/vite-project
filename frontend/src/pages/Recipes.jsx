import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import styles from '../Index.module.css'
import Header from '../Header.jsx'
import Left from '../Left.jsx'
import Right from '../Right.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Header />
    <div className={styles.main}>
      <Left />
      <Right />
    </div>
  </StrictMode>,
)
