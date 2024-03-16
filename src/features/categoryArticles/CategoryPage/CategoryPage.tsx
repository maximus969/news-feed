import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './CategoryPage.css'
import { SidebarArticleCard } from '../../../components/SidebarArticleCard/SidebarArticleCard'
import { ArticleCard } from '../../../components/ArticleCard/ArticleCard'
import { Hero } from '../../../components/Hero/Hero'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatchType } from '@components/store'
import { categoryNames } from '../../categories/types'
import { getCategoryNews } from '../selectors'
import { categoryIds, categoryTitles } from '../../categories/constants'
import { getCategories } from '../../categories/selectors'
import { getSources } from '../../Source/selectors'
import { fetchCategoryArticles } from '../actions'
import { PartnersArticles } from '../../partnersArticles/components/PartnersArticles'
import { HeroSkeleton } from '@components/Hero/HeroSkeleton'
import { repeat } from '@components/utils'
import { ArticleCardSkeleton } from '@components/ArticleCard/ArticleCardSkeleton'
import { SidebarArticleCardSkeleton } from '@components/SidebarArticleCard/SidebarArticleCardSkeleton'

export const CategoryPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatchType>()
  const { category } = useParams() as { category: categoryNames }
  const articles = useSelector(getCategoryNews(categoryIds[category]))
  const categories = useSelector(getCategories)
  const sources = useSelector(getSources)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    dispatch(fetchCategoryArticles(categoryIds[category])).then(() => {
      setLoading(false)
    })
  }, [category])

  if (loading) {
    return (
      <section className="category-page">
        <HeroSkeleton title={categoryTitles[category]} className="category-page__hero" />
        <div className="container grid">
          <section className="category-page__content">
            {repeat((i) => {
              return <ArticleCardSkeleton key={i} className="category-page__item" />
            }, 6)}
          </section>
          <section className="category-page__sidebar">
            {repeat((i) => {
              return <SidebarArticleCardSkeleton key={i} className="category-page__sidebar-item" />
            }, 3)}
          </section>
        </div>
      </section>
    )
  }

  return (
    <section className="category-page">
      <Hero
        title={categoryTitles[category as categoryNames]}
        className="category-page__hero"
        image={require(`../../../images/categories/${category}.jpg`)}
      />
      <div className="container grid">
        <section className="category-page__content">
          {articles.slice(3).map((item) => {
            const category = categories?.find(({ id }) => item?.category_id === id)
            const source = sources.find(({ id }) => item.source_id === id)
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
          {articles.slice(0, 3).map((item) => {
            const source = sources.find(({ id }) => item.source_id === id)
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
