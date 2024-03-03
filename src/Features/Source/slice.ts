import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { SourcesType } from './types'

const initialState: SourcesType[] = []

export const sourcesSlice = createSlice({
  name: 'sources',
  initialState,
  reducers: {
    setSources: (state, action: PayloadAction<SourcesType[]>) => {
      return action.payload
    },
  },
})

export const { setSources } = sourcesSlice.actions

export const sourcesReducer = sourcesSlice.reducer
