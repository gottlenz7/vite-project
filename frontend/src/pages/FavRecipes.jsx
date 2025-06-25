import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import styles from '../Index.module.css'
import Header from '../Header.jsx'
import Favorite from '../Favorite.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Header />
    <Favorite />
  </StrictMode>,
)
