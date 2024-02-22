import React, { useEffect, useState } from 'react'
import './Article.css'
import {
  ArticleItem,
  Items,
  RelatedArticleItem,
  Sources as SourcesType,
  beautifyDate,
  categoryNames,
} from '../../types'
import { useParams } from 'react-router-dom'
import { SidebarArticleCard } from '@components/SidebarArticleCard/SidebarArticleCard'
import { Hero } from '@components/Hero/Hero'
import { ArticleCard } from '@components/ArticleCard/ArticleCard'
import { Source } from '@components/Source/Source'
import { Title } from '@components/Title/Title'
import { categoryTitles } from '../../utils'

export const Article: React.FC = () => {
  const { id }: { id?: number } = useParams()
  const [articleItem, setArticleItem] = useState<ArticleItem | null>(null)
  const [relatedArticles, setRelatedArticles] = useState<Items[] | null>(null)
  const [sources, setSources] = useState<SourcesType[] | null>([])

  useEffect(() => {
    fetch(`https://frontend.karpovcourses.net/api/v2/news/full/${id}`)
      .then((response) => response.json())
      .then(setArticleItem)

    Promise.all([
      fetch(`https://frontend.karpovcourses.net/api/v2/news/related/${id}?count=9`).then((response) => response.json()),
      fetch(`https://frontend.karpovcourses.net/api/v2/sources`).then((response) => response.json()),
    ]).then((response) => {
      const articles: RelatedArticleItem = response[0]
      setRelatedArticles(articles.items)

      const sources = response[1]
      setSources(sources)
    })
  }, [id])

  if (articleItem === null || relatedArticles === null) {
    return null
  }

  return (
    <section className="article-page">
      <Hero title={articleItem.title} image={articleItem.image} className="article-page__hero" />

      <div className="container article-page__main">
        <div className="article-page__info">
          <span className="article-page__category">{articleItem.category.name}</span>
          <span className="article-page__date">{beautifyDate(articleItem.date)}</span>
          {articleItem && articleItem.link.length > 0 && (
            <Source className={'article-page__source'} href={articleItem.link}>
              {categoryTitles[articleItem.source?.name as categoryNames]}
            </Source>
          )}
        </div>
        <div className="grid">
          <div className="article-page__content">
            <p>{articleItem?.text}</p>
          </div>

          <div className="sidebar__article-page">
            {relatedArticles.slice(3, 9).map((item) => {
              const source = sources?.find(({ id }) => item.source_id === id)
              return (
                <SidebarArticleCard
                  className="sidebar__article-item"
                  date={item.date}
                  id={item.id}
                  key={item.id}
                  title={item.title}
                  source={source?.name || ''}
                  image={item.image}
                />
              )
            })}
          </div>
        </div>
      </div>

      <section className="article-page__related-articles">
        <div className="container">
          <Title Component={'h2'} className="article-page__related-articles-title">
            Читайте также
          </Title>

          <div className="grid article-page__related-articles-list">
            {relatedArticles?.slice(0, 3).map((article) => {
              const source = sources?.find(({ id }) => article?.source_id === id)
              return (
                <ArticleCard
                  className="article-page__related-articles-item"
                  key={article.id}
                  date={article.date}
                  source={source?.name}
                  description={article.description}
                  title={article.title}
                  id={article.id}
                />
              )
            })}
          </div>
        </div>
      </section>
    </section>
  )
}
