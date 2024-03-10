import { RootState } from '@components/store'
import { getCategories } from '../categories/selectors'
import { CategoriesType } from '../categories/types'
import { getSources } from '../Source/selectors'
import { ArticleItemType } from './types'
import { SourcesType } from '../Source/types'

export const getArticleItem = (state: RootState): ArticleItemType | null => state.articleItem.item

export const getCachedArticleItem =
  (id: number) =>
  (state: RootState): ArticleItemType | null => {
    const articleItem = getArticleItem(state)

    if (articleItem) {
      return articleItem
    }

    const articleInList = [
      state.articlesList.news,
      state.articlesList.trends,
      Object.values(state.categoryArticles).flat(),
      Object.values(state.relatedArticles).flat(),
    ]
      .flat()
      .find((item) => item.id === id)

    if (!articleInList) {
      return null
    }

    return {
      ...articleInList,
      category: getCategories(state).find(({ id }) => id === articleInList.category_id) as CategoriesType,
      source: getSources(state).find(({ id }) => id === articleInList.source_id) as SourcesType,
      link: '',
      text: '',
    }
  }
