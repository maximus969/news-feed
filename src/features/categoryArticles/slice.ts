import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { ArticleType } from '../articleItem/types'

type initialCategoryType = Record<number, ArticleType[]>

const initialCategoryState: initialCategoryType = {}

export const categoryArticlesSlice = createSlice({
  name: 'categoryArticles',
  initialState: initialCategoryState,
  reducers: {
    setCategoryArticles: (state, action: PayloadAction<{ id: number; articles: ArticleType[] }>) => {
      state[action.payload.id] = action.payload.articles
    },
  },
})

export const { setCategoryArticles } = categoryArticlesSlice.actions
export const categoryArticlesReducer = categoryArticlesSlice.reducer
