export interface PartnersPostsType {
  id: number
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
