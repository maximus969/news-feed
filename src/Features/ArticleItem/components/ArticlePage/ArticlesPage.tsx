import React, { useEffect } from 'react'
import './ArticlesPage.css'
import { useParams } from 'react-router-dom'
import { SidebarArticleCard } from '../../../../components/SidebarArticleCard/SidebarArticleCard'
import { Hero } from '@components/Hero/Hero'
import { ArticleCard } from '../../../../components/ArticleCard/ArticleCard'
import { Source } from '../../../Source/components/Source'
import { Title } from '@components/Title/Title'
import { beautifyDate } from '../../../../components/utils'
import { useDispatch, useSelector } from 'react-redux'

import { fetchRelatedArticles } from '../../../relatedNews/actions'
import { categoryNames } from '../../../categories/types'
import { categoryTitles } from '../../../categories/constants'
import { getSources } from '../../../Source/selectors'
import { getRelatedArticles } from '../../../relatedNews/selectors'
import { getCachedArticleItem } from '../../selectors'
import { fetchArticleItem } from '../../actions'
import { AppDispatchType } from '@components/store'

export const Article: React.FC = () => {
  const { id }: { id?: number } = useParams()
  const dispatch = useDispatch<AppDispatchType>()
  const articleItem = useSelector(getCachedArticleItem(Number(id)))
  const relatedArticles = useSelector(getRelatedArticles(Number(id)))
  const sources = useSelector(getSources)

  useEffect(() => {
    dispatch(fetchArticleItem(Number(id)))
    dispatch(fetchRelatedArticles(Number(id)))
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
