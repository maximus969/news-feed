export enum categoryNames {
  sport = 'sport',
  tech = 'tech',
  karpov = 'karpov.courses',
  fashion = 'fashion',
  other = 'other',
  politics = 'politics',
}

export type CategoriesType = {
  id: number
  name: categoryNames
}
