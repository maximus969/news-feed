import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { NewsResponse, categoryNames } from '../../types'
import { categoryIds, categoryTitles } from '../../utils'
import { PartnersArticles } from '../PartnersArticles/PartnersArticles'

import './CategoryPage.css'
import { SidebarArticleCard } from '@components/SidebarArticleCard/SidebarArticleCard'
import { Hero } from '@components/Hero/Hero'
import { ArticleCard } from '@components/ArticleCard/ArticleCard'

export const CategoryPage: React.FC = () => {
  const { category } = useParams() as { category: categoryNames }
  const [articles, setArticles] = useState<NewsResponse>({
    items: [],
    categories: [],
    sources: [],
  })

  useEffect(() => {
    fetch('https://frontend.karpovcourses.net/api/v2/ru/news/' + categoryIds[category] || '')
      .then((response) => response.json())
      .then((response: NewsResponse) => {
        setArticles(response)
      })
  }, [category])

  return (
    <section className="category-page">
      <Hero title={categoryTitles[category as categoryNames]} image="test" className="category-page__hero" />
      <div className="container grid">
        <section className="category-page__content">
          {articles.items.slice(3).map((item) => {
            const category = articles?.categories?.find(({ id }) => item?.category_id === id)
            const source = articles.sources.find(({ id }) => item.source_id === id)
            return (
              <ArticleCard
                className="category-page__item"
                key={item.id}
                id={item.id}
                title={item.title}
                description={item.description}
                image={item.image}
                category={category?.name}
                source={source?.name}
              />
            )
          })}
        </section>
        <section className="category-page__sidebar">
          {articles.items.slice(0, 3).map((item) => {
            const source = articles.sources.find(({ id }) => item.source_id === id)
            return (
              <SidebarArticleCard
                className="category-page__sidebar-item"
                key={item.id}
                id={item.id}
                title={item.title}
                source={source?.name || ''}
                image={item.image}
                date={item.date}
              />
            )
          })}
        </section>
      </div>

      <div className="partners-article">
        <div>
          <PartnersArticles />
        </div>
      </div>
    </section>
  )
}
