import React, { useEffect, useState } from 'react'
import './Homepage.css'
import { Hero } from '@components/Hero/Hero'

import { Link } from 'react-router-dom'
import { Categories, NewsResponse, Sources } from 'types'
import { categoryIds } from '../../utils'
import { ArticleCard } from '@components/ArticleCard/ArticleCard'
import { SidebarArticleCard } from '@components/SidebarArticleCard/SidebarArticleCard'
import { Title } from '@components/Title/Title'
import { mainUrl, trendsUrl } from '@components/apiUrls'

type categoriesRecord = Record<Categories['id'], Categories>
type sourcesRecord = Record<Sources['id'], Sources>

export const Homepage: React.FC = () => {
  const [articles, setArticles] = useState<NewsResponse['items']>([])
  const [karpovArticles, setKarpovArticles] = useState<NewsResponse['items']>([])
  const [trendArticles, setTrendArticles] = useState<NewsResponse['items']>([])
  const [categories, setCategories] = useState<categoriesRecord>({})
  const [sources, setSources] = useState<sourcesRecord>({})

  useEffect(() => {
    Promise.all<NewsResponse>([
      fetch(mainUrl).then((response) => response.json()),
      fetch(`${mainUrl}${categoryIds['karpov.courses']}`).then((response) => response.json()),
      fetch(trendsUrl).then((response) => response.json()),
    ]).then(([articles, karpovArticles, trendArticles]) => {
      setArticles(articles.items), setKarpovArticles(karpovArticles.items), setTrendArticles(trendArticles.items)

      setCategories(
        [articles.categories, karpovArticles.categories, trendArticles.categories]
          .flat()
          .reduce(function (acc: categoriesRecord, categoryItem) {
            acc[categoryItem.id] = categoryItem
            return acc
          }, {})
      )

      setSources(
        [articles.categories, karpovArticles.categories, trendArticles.categories]
          .flat()
          .reduce(function (acc: sourcesRecord, sourceItem) {
            acc[sourceItem.id] = sourceItem
            return acc
          }, {})
      )
    })
  }, [])

  const firstArticle = articles[0]

  return (
    <div className="home-page">
      {firstArticle && (
        <Link className="home-page__hero-link" to={`/article/${firstArticle.id}`}>
          <Hero
            className="home-page__hero"
            image={firstArticle.image}
            title={firstArticle.title}
            text={firstArticle.description}
          />
        </Link>
      )}

      <section className="container home-page__section">
        <Title Component={'h2'} className="home-page__title">
          В тренде
        </Title>
        <div className="grid">
          {trendArticles.map(({ id, title, category_id, date }) => {
            const category = categories[category_id]
            return (
              <ArticleCard
                className="home-page__trends-item"
                key={id}
                id={id}
                date={date}
                title={title}
                category={category?.name}
              />
            )
          })}
        </div>
      </section>

      <section className="container home-page__section">
        <Title Component={'h2'} className="home-page__title">
          Karpov
        </Title>
        <div className="grid">
          <section className="home-page__content">
            {karpovArticles.slice(2, 6).map((item) => {
              return (
                <ArticleCard
                  className="home-page__article-card"
                  key={item.id}
                  id={item.id}
                  date={item.date}
                  title={item.title}
                  image={item.image}
                  description={item.description}
                  source={sources[item.source_id]?.name}
                />
              )
            })}
          </section>

          <section className="home-page__sidebar">
            {karpovArticles.slice(0, 2).map((item) => {
              return (
                <ArticleCard
                  className="home-page__sidebar-item"
                  key={item.id}
                  id={item.id}
                  date={item.date}
                  title={item.title}
                  image={item.image}
                  description={item.description}
                  source={sources[item.source_id]?.name}
                />
              )
            })}
          </section>
        </div>
      </section>

      <div className="home-page__promo" />

      <section className="container grid home-page__section">
        <section className="home-page__content">
          {articles.slice(4).map((item) => {
            return (
              <ArticleCard
                className={'home-page__article-card'}
                key={item.id}
                id={item.id}
                title={item.title}
                description={item.description}
                source={sources[item.source_id]?.name}
                image={item.image}
                date={item.date}
              />
            )
          })}
        </section>
        <section className="home-page__sidebar">
          {articles.slice(1, 4).map((item) => {
            return (
              <SidebarArticleCard
                className="home-page__sidebar-item"
                key={item.id}
                id={item.id}
                title={item.title}
                source={sources[item.source_id]?.name}
                date={item.date}
                image={item.image}
              />
            )
          })}
        </section>
      </section>
    </div>
  )
}
