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
import { useAdaptive } from '@components/customHooks'
import { PartnersArticles } from '@features/partnersArticles/components/PartnersArticles'
import { useTranslation } from 'react-i18next'
import { Locale } from '@features/locale/types'

export const Homepage: React.FC = () => {
  const dispatch = useDispatch<AppDispatchType>()
  const articles = useSelector(getNews)
  const karpovArticles = useSelector(getCategoryNews(categoryIds['karpov.courses']))
  const trendArticles = useSelector(getTrends)
  const categories = useSelector(getCategories)
  const sources = useSelector(getSources)
  const [loading, setLoading] = useState(true)
  const { isDesktop, isMobile } = useAdaptive()
  const { t, i18n } = useTranslation()

  useEffect(() => {
    setLoading(true)
    Promise.all([
      dispatch(fetchNews(i18n.language)),
      dispatch(fetchTrends(i18n.language)),
      dispatch(fetchCategoryArticles({ lang: i18n.language, categoryId: categoryIds['karpov.courses'] })),
    ]).then(() => setLoading(false))
  }, [i18n.language])

  const firstArticle = articles[0]
  const mainArticles = isMobile ? articles.slice(1) : articles.slice(4)

  if (loading) {
    return (
      <div className="home-page">
        <HeroSkeleton hasText={true} className="home-page__hero" />
        <section className="container home-page__section">
          <Title Component={'h2'} className="home-page__title">
            {t(`homepage_trends_title`)}
          </Title>
          <div className="grid" aria-label="Загрузка">
            {repeat((i) => {
              return (
                <ArticleCardSkeleton
                  key={i}
                  hasDescription={false}
                  hasImage={false}
                  className="home-page__trends-item"
                />
              )
            }, 6)}
          </div>
        </section>

        {i18n.language === Locale.ru && (
          <section className="container home-page__section">
            <Title Component={'h2'} className="home-page__title">
              Karpov
            </Title>
            <div className="grid">
              <section className="home-page__content">
                {repeat((i) => {
                  return (
                    <ArticleCardSkeleton
                      key={i}
                      className="home-page__article-card"
                      hasDescription={false}
                      aria-label="Загрузка"
                    />
                  )
                }, 4)}
              </section>

              <section className="home-page__sidebar">
                {repeat((i) => {
                  return (
                    <SidebarArticleCardSkeleton key={i} className="home-page__sidebar-item" aria-label="Загрузка" />
                  )
                }, 2)}
              </section>
            </div>
          </section>
        )}
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
          {t(`homepage_trends_title`)}
        </Title>
        <div className="grid">
          {trendArticles.map(({ id, title, category_id, source_id, date }) => {
            const category = categories[category_id]
            const source = sources.find(({ id }) => source_id === id)
            return (
              <ArticleCard
                className="home-page__trends-item"
                key={id}
                id={id}
                date={date}
                title={title}
                category={category?.name}
                source={source?.name}
              />
            )
          })}
        </div>
      </section>

      {i18n.language === Locale.ru && (
        <section className="container home-page__section">
          <Title Component={'h2'} className="home-page__title">
            Karpov
          </Title>
          <div className="grid">
            <div className="home-page__content">
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
            </div>

            <aside className="home-page__sidebar">
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
            </aside>
          </div>
        </section>
      )}

      {i18n.language === Locale.ru && (
        <section className="home-page__promo">
          <PartnersArticles />
        </section>
      )}

      <section className="container grid home-page__section">
        <div className="home-page__content">
          {mainArticles.map((item) => {
            const source = sources.find(({ id }) => item.source_id === id)
            return (
              <ArticleCard
                className={'home-page__article-card'}
                key={item.id}
                id={item.id}
                title={item.title}
                description={item.description}
                source={source?.name}
                image={item.image}
                date={item.date}
              />
            )
          })}
        </div>
        {isDesktop && (
          <aside className="home-page__sidebar">
            {articles.slice(1, 4).map((item) => {
              const source = sources.find(({ id }) => item.source_id === id)
              return (
                <SidebarArticleCard
                  className="home-page__sidebar-item"
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  source={source?.name || ''}
                  date={item.date}
                  image={item.image}
                />
              )
            })}
          </aside>
        )}
      </section>
    </div>
  )
}
