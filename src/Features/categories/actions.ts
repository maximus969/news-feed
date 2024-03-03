import { apiFetchCategories } from '@components/api'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { setCategories } from './slice'

export const fetchCategories = createAsyncThunk('api/fetchCategories', (_, thunk) => {
  apiFetchCategories().then((categories) => {
    thunk.dispatch(setCategories(categories))
  })
})
