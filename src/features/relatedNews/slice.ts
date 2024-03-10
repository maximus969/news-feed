import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { ArticleType } from '../ArticleItem/types'

type InitialState = Record<number, ArticleType[]>

const initialState: InitialState = {}

export const relatedArticlesSlice = createSlice({
  name: 'relatedArticles',
  initialState,
  reducers: {
    setRelatedArticles: (state, action: PayloadAction<{ id: number; articles: ArticleType[] }>) => {
      state[action.payload.id] = action.payload.articles
    },
  },
})

export const { setRelatedArticles } = relatedArticlesSlice.actions

export const relatedArticlesReducer = relatedArticlesSlice.reducer
