import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { ArticleType } from '../ArticleItem/types'

interface InitialState {
  news: ArticleType[]
  trends: ArticleType[]
}

const initialState: InitialState = {
  news: [],
  trends: [],
}

export const articlesListSlice = createSlice({
  name: 'articlesList',
  initialState,
  reducers: {
    setNews: (state, action: PayloadAction<ArticleType[]>) => {
      state.news = action.payload
    },
    setTrends: (state, action: PayloadAction<ArticleType[]>) => {
      state.trends = action.payload
    },
  },
})

export const { setNews, setTrends } = articlesListSlice.actions

export const articlesReducer = articlesListSlice.reducer
