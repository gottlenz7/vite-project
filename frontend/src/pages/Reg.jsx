import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import styles from '../Index.module.css'
import Header from '../Header.jsx'
import Profile from '../Profile.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Header />
    <Profile />
  </StrictMode>,
)
