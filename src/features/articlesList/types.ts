import { SourcesType } from '../Source/types'
import { ArticleType } from '../ArticleItem/types'
import { CategoriesType } from '../categories/types'

export type NewsResponse = {
  items: ArticleType[]
  categories: CategoriesType[]
  sources: SourcesType[]
}
