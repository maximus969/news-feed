import React, { useEffect, useState } from 'react'
import './Homepage.css'
import { Hero } from '@components/Hero/Hero'
import { Link } from 'react-router-dom'
import { ArticleCard } from '../../../../components/ArticleCard/ArticleCard'
import { SidebarArticleCard } from '../../../../components/SidebarArticleCard/SidebarArticleCard'
import { Title } from '@components/Title/Title'
import { categoryIds } from '../../../categories/constants'
import { useDispatch, useSelector } from 'react-redux'
import { getNews, getTrends } from '../../selectors'
import { getCategoryNews } from '../../../categoryArticles/selectors'
import { getCategories } from '../../../categories/selectors'
import { getSources } from '../../../Source/selectors'
import { fetchNews, fetchTrends } from '../../actions'
import { fetchCategoryArticles } from '../../../categoryArticles/actions'
import { AppDispatchType } from '@components/store'
import { repeat } from '@components/utils'
import { HeroSkeleton } from '@components/Hero/HeroSkeleton'
import { ArticleCardSkeleton } from '@components/ArticleCard/ArticleCardSkeleton'
import { SidebarArticleCardSkeleton } from '@components/SidebarArticleCard/SidebarArticleCardSkeleton'

export const Homepage: React.FC = () => {
  const dispatch = useDispatch<AppDispatchType>()
  const articles = useSelector(getNews)
  const karpovArticles = useSelector(getCategoryNews(categoryIds['karpov.courses']))
  const trendArticles = useSelector(getTrends)
  const categories = useSelector(getCategories)
  const sources = useSelector(getSources)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    Promise.all([
      dispatch(fetchNews()),
      dispatch(fetchTrends()),
      dispatch(fetchCategoryArticles(categoryIds['karpov.courses'])),
    ]).then(() => setLoading(false))
  }, [])

  const firstArticle = articles[0]

  if (loading) {
    return (
      <div className="home-page">
        <HeroSkeleton hasText={true} className="home-page__hero" />
        <section className="container home-page__section">
          <Title Component={'h2'} className="home-page__title">
            В тренде
          </Title>
          <div className="grid">
            {repeat(() => {
              return <ArticleCardSkeleton hasDescription={false} hasImage={false} className="home-page__trends-item" />
            }, 6)}
          </div>
        </section>
        <section className="container home-page__section">
          <Title Component={'h2'} className="home-page__title">
            Karpov
          </Title>
          <div className="grid">
            <section className="home-page__content">
              {repeat((i) => {
                return <ArticleCardSkeleton key={i} className="home-page__article-card" hasDescription={false} />
              }, 4)}
            </section>

            <section className="home-page__sidebar">
              {repeat((i) => {
                return <SidebarArticleCardSkeleton key={i} className="home-page__sidebar-item" />
              }, 2)}
            </section>
          </div>
        </section>
      </div>
    )
  }

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
