import React, { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'

import { Homepage } from '../Homepage/Homepage'
import { Article } from '../Article/Article'

import { AdminPanel } from '../Admin/AdminPanel'
import { Page } from '../Page/Page'
import { AdminArticlesItem } from '../AdminArticlesItem/AdminArticlesItem'
import { AdminArticles } from '../AdminArticles/AdminArticles'
import { RequireAuth } from '../RequireAuth/RequireAuth'
import { LoginContainer } from '../../Features/Auth/Login/LoginContainer'
import { CategoryPage } from '@components/CategoryPage/CategoryPage'

export const App: React.FC = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <React.Fragment>
      <Routes>
        <Route
          path="/:category"
          element={
            <Page>
              <CategoryPage />
            </Page>
          }
        />
        <Route
          path="/"
          element={
            <Page>
              <Homepage />
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
