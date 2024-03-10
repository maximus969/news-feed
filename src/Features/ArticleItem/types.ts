import { SourcesType } from '../source/types'
import { CategoriesType } from '../categories/types'

export type ArticleItemType = {
  id: number
  lang?: string
  date: string
  title: string
  description?: string
  image: string
  link: string
  text: string
  category: CategoriesType
  source: SourcesType
  author?: string
}

export interface ArticleType {
  id: number
  lang: string
  date: string
  title: string
  description: string
  image: string
  source_id: number
  category_id: number
}
