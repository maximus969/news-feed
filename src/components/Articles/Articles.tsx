import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { NewsResponse } from '../../types'
import { categoryIds } from '../../utils'
import { MainArticle } from '../MainArticle/MainArticle'
import { PartnersArticles } from '../PartnersArticles/PartnersArticles'
import { SmallArticle } from '../SmallArticle/SmallArticle'
import './Articles.css'

export const Articles: React.FC = () => {
  const { categoryID = 'index' }: { categoryID?: string } = useParams()
  const [articles, setArticles] = useState<NewsResponse>({ items: [], categories: [], sources: [] })

  useEffect(() => {
    fetch('https://frontend.karpovcourses.net/api/v2/ru/news/' + categoryIds[categoryID] || '')
      .then((response) => response.json())
      .then((response: NewsResponse) => {
        setArticles(response)
      })
  }, [categoryID])

  return (
    <section className="articles">
      <div className="container grid">
        <section className="articles__big-column">
          {articles.items.slice(0, 3).map((item) => {
            const category = articles?.categories?.find(({ id }) => item?.category_id === id)
            const source = articles.sources.find(({ id }) => item.source_id === id)
            return (
              <MainArticle
                key={item.id}
                title={item.title}
                description={item.description}
                image={item.image}
                category={category?.name || ''}
                source={source?.name || ''}
                id={item.id}
              />
            )
          })}
        </section>
        <section className="articles__small-column">
          {articles.items.slice(3, 12).map((item) => {
            const source = articles.sources.find(({ id }) => item.source_id === id)
            return <SmallArticle key={item.id} title={item.title} source={source?.name} date={item.date} id={item.id} />
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
