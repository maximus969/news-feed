import { apiFetchRelatedArticles } from '@components/api'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { setRelatedArticles } from './slice'

export const fetchRelatedArticles = createAsyncThunk('api/fetchRelatedArticles', (articleId: number, thunk) => {
  apiFetchRelatedArticles(articleId).then((news) => {
    thunk.dispatch(setRelatedArticles({ id: articleId, articles: news.items }))
  })
})
