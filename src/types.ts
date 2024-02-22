export type Items = {
  lang: string
  date: string
  title: string
  description: string
  id: string
  image: string
  source_id: number
  category_id: number
}

export type Categories = {
  id: number
  name: categoryNames
}

export type Sources = {
  id: number
  name: string
  site?: string
}

export type categoryNames = 'sport' | 'tech' | 'karpov.courses' | 'fashion' | 'other' | 'politics'

export type NewsResponse = {
  items: Items[]
  categories: Categories[]
  sources: Sources[]
}

export type ArticleItem = {
  id: string
  lang?: string
  date: string
  title: string
  description?: string
  image: string
  link: string
  text: string
  category: Categories
  source: Sources
  author?: string
}

export interface RelatedArticleItem {
  items: Items[]
}

export const beautifyDate = (date: string): string => {
  return new Date(date).toLocaleDateString('ru-RU', {
    month: 'long',
    day: 'numeric',
  })
}

export interface IPartnersPosts {
  id: string
  'company-name': string
  articleTitle: string
  description: string
  text: string
  image: string
  created: {
    nanoseconds: number
    seconds: number
  }
}
