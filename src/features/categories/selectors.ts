import { RootState } from '@components/store'
import { CategoriesType } from '../categoryArticles/types'

export const getCategories = (state: RootState): CategoriesType[] => state.categoriesList
