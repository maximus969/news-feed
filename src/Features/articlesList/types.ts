import { SourcesType } from '../source/types'
import { ArticleType } from '../articleItem/types'
import { CategoriesType } from '../categories/types'

export type NewsResponse = {
  items: ArticleType[]
  categories: CategoriesType[]
  sources: SourcesType[]
}
