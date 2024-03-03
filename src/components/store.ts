import { PayloadAction, configureStore, ThunkDispatch, ThunkAction } from '@reduxjs/toolkit'
import { sourcesReducer } from '../Features/source/slice'
import { relatedArticlesReducer } from '../Features/relatedNews/slice'
import { categoryArticlesReducer } from '../Features/categoryArticles/slice'
import { categoriesReducer } from '../Features/categories/slice'
import { articlesReducer } from '../Features/articlesList/slice'
import { articlesItemReducer } from '../Features/ArticleItem/slice'

export const store = configureStore({
  reducer: {
    articlesList: articlesReducer,
    categoryArticles: categoryArticlesReducer,
    categoriesList: categoriesReducer,
    relatedArticles: relatedArticlesReducer,
    articleItem: articlesItemReducer,
    sources: sourcesReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatchType = ThunkDispatch<RootState, unknown, PayloadAction>
export type AppAction<T> = ThunkAction<T, RootState, unknown, PayloadAction>
