import { RootState } from '@components/store'
import { ArticleType } from '../ArticleItem/types'

export const getNews = (state: RootState): ArticleType[] => state.articlesList.news

export const getTrends = (state: RootState): ArticleType[] => state.articlesList.trends
