import { Articles } from '../Articles/Articles'
import { Article } from '../Article/Article'
import React, { useEffect } from 'react'
import './App.css'
import { Routes, Route, useLocation } from 'react-router-dom'

import { AdminPanel } from '../Admin/AdminPanel'
import { Page } from '../Page/Page'
import { AdminArticlesItem } from '../AdminArticlesItem/AdminArticlesItem'
import { AdminArticles } from '../AdminArticles/AdminArticles'
import { RequireAuth } from '../RequireAuth/RequireAuth'
import { LoginContainer } from '../../Features/Auth/Login/LoginContainer'

export const App: React.FC = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

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
            <RequireAuth>
              <AdminPanel>
                <AdminArticles />
              </AdminPanel>
            </RequireAuth>
          }
        />
        <Route
          path="/admin/create"
          element={
            <RequireAuth>
              <AdminPanel>
                <AdminArticlesItem />
              </AdminPanel>
            </RequireAuth>
          }
        />
        <Route
          path="/admin/edit/:id"
          element={
            <RequireAuth>
              <AdminPanel>
                <AdminArticlesItem />
              </AdminPanel>
            </RequireAuth>
          }
        />
        <Route
          path={'/login'}
          element={
            <Page>
              <LoginContainer />
            </Page>
          }
        />
      </Routes>
    </React.Fragment>
  )
}
