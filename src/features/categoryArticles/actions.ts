import { apiFetchCategory } from '@components/api'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { setCategoryArticles } from './slice'

export const fetchCategoryArticles = createAsyncThunk(
  'api/fetchCategoryArticles',
  (params: { lang: string; categoryId: number }, thunk) => {
    return apiFetchCategory(params.lang, params.categoryId).then((news) => {
      thunk.dispatch(setCategoryArticles({ id: params.categoryId, articles: news.items }))
    })
  }
)
