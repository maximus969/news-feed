import { AdminArticles } from '../../features/Admin/AdminArticles/AdminArticles'
import { AdminArticlesItem } from '../../features/Admin/AdminArticlesItem/AdminArticlesItem'
import { AdminPanel } from '../../features/Admin/AdminPanel/AdminPanel'
import { Article } from '../../features/ArticleItem/components/ArticlePage/ArticlesPage'
import { Homepage } from '../../features/articlesList/components/Homepage/Homepage'
import { RequireAuth } from '../../features/Auth/components/RequireAuth/RequireAuth'
import { LoginContainer } from '../../features/Auth/Login/LoginContainer'
import { CategoryPage } from '../../features/categoryArticles/CategoryPage/CategoryPage'
import React, { useEffect, useRef } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { Page } from '../Page/Page'

export const App: React.FC = () => {
  const { pathname } = useLocation()
  const prevPathname = useRef(pathname)

  useEffect(() => {
    if (pathname !== prevPathname.current) {
      prevPathname.current = pathname
      window.scrollTo(0, 0)
    }
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
