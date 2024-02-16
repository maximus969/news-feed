export interface Items {
  lang: string;
  date: string;
  title: string;
  description: string;
  id: number;
  image: string;
  source_id: number;
  category_id: number;
}

export interface Categories {
  id: number;
  name: string;
}
export interface Sources {
  id: number;
  name: string;
  site?: string;
}

export interface NewsResponse {
  items: Items[];
  categories: Categories[];
  sources: Sources[];
}

export interface ArticleItem {
  id: number;
  lang: string;
  date: string;
  title: string;
  description: string;
  image: string;
  link: string;
  text: string;
  category: Categories;
  source: Sources;
}

export interface RelatedArticleItem {
  items: Items[];
}

export const beautifyDate = (date: string): string => {
  return new Date(date).toLocaleDateString('ru-RU', {
    month: 'long',
    day: 'numeric',
  });
};
