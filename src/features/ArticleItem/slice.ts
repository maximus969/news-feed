import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { ArticleItemType } from './types'

interface initialArticleItemType {
  item: ArticleItemType | null
}

const initialArticleItemState: initialArticleItemType = {
  item: null,
}

export const articleItemSlice = createSlice({
  name: 'articleItem',
  initialState: initialArticleItemState,
  reducers: {
    setArticleItem: (state, action: PayloadAction<ArticleItemType | null>) => {
      state.item = action.payload
    },
  },
})

export const { setArticleItem } = articleItemSlice.actions
export const articlesItemReducer = articleItemSlice.reducer
