import { Articles } from '../Articles/Articles'
import { Article } from '../Article/Article'
import React from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'

import { Header } from '../Header/Header'
import { Footer } from '../Footer/Footer'

export const App: React.FC = () => {
  // const { pathname } = useLocation()

  // useEffect(() => {
  //   window.scrollTo(0, 0)
  // }, [pathname])

  return (
    <React.Fragment>
      <Header />
      <Routes>
        <Route path="/:categoryID" element={<Articles />} />
        <Route path="/" element={<Articles />} />
        <Route path="/article/:id" element={<Article />} />
      </Routes>
      <Footer />
    </React.Fragment>
  )
}
