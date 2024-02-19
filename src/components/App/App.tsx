import { Articles } from '../Articles/Articles'
import { Article } from '../Article/Article'
import React from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'

import { AdminPanel } from '../Admin/AdminPanel'
import { Page } from '../Page/Page'
import { AdminArticlesItem } from '../AdminArticlesItem/AdminArticlesItem'
import { AdminArticles } from '../AdminArticles/AdminArticles'

export const App: React.FC = () => {
  // const { pathname } = useLocation()

  // useEffect(() => {
  //   window.scrollTo(0, 0)
  // }, [pathname])

  return (
    <React.Fragment>
      <Routes>
        <Route
          path="/:categoryID"
          element={
            <Page>
              <Articles />
            </Page>
          }
        />
        <Route
          path="/"
          element={
            <Page>
              <Articles />
            </Page>
          }
        />
        <Route
          path="/article/:id"
          element={
            <Page>
              <Article />
            </Page>
          }
        />
        <Route
          path="/admin"
          element={
            <AdminPanel>
              <AdminArticles />
            </AdminPanel>
          }
        />
        <Route
          path="/admin/create"
          element={
            <AdminPanel>
              <AdminArticlesItem />
            </AdminPanel>
          }
        />
        <Route
          path="/admin/edit/:id"
          element={
            <AdminPanel>
              <AdminArticlesItem />
            </AdminPanel>
          }
        />
      </Routes>
    </React.Fragment>
  )
}
