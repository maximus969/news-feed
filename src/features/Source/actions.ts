import { apiFetchSources } from '@components/api'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { setSources } from './slice'

export const fetchSources = createAsyncThunk('api/fetchSources', (_, thunk) => {
  return apiFetchSources().then((sources) => {
    thunk.dispatch(setSources(sources))
  })
})
