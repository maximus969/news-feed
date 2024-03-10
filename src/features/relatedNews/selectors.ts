import { RootState } from '@components/store'
import { ArticleType } from '../articleItem/types'

export const getRelatedArticles =
  (articleId: number) =>
  (state: RootState): ArticleType[] =>
    state.relatedArticles[articleId] || []
