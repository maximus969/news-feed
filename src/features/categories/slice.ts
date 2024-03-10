import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { CategoriesType } from './types'

const initialState: CategoriesType[] = []

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<CategoriesType[]>) => {
      return action.payload
    },
  },
})

export const { setCategories } = categoriesSlice.actions

export const categoriesReducer = categoriesSlice.reducer
