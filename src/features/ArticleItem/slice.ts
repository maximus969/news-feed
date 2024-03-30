import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { ArticleItemType } from './types'

interface initialArticleItemType {
  items: Record<number, ArticleItemType>
}

const initialArticleItemState: initialArticleItemType = {
  items: {},
}

export const articleItemSlice = createSlice({
  name: 'articleItem',
  initialState: initialArticleItemState,
  reducers: {
    setArticleItem: (state, action: PayloadAction<ArticleItemType>) => {
      state.items = {
        ...state.items,
        [action.payload?.id]: action.payload,
      }
    },
  },
})

export const { setArticleItem } = articleItemSlice.actions
export const articlesItemReducer = articleItemSlice.reducer
