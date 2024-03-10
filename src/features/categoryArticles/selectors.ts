import { RootState } from '@components/store'
import { ArticleType } from '../ArticleItem/types'

export const getCategoryNews =
  (categoryId: number) =>
  (state: RootState): ArticleType[] => {
    return state.categoryArticles[categoryId] || []
  }
