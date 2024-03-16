import { apiFetchArticleItem } from '@components/api'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { setArticleItem } from './slice'

export const fetchArticleItem = createAsyncThunk('api/fetchArticleItem', (articleId: number, thunk) => {
  return apiFetchArticleItem(articleId).then((article) => {
    thunk.dispatch(setArticleItem(article))
  })
})
