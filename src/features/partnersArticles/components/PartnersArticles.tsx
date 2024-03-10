import React, { useEffect, useState } from 'react'
import './PartnersArticles.css'
import { getSortedPartnerArticle } from '@components/api'
import { PartnersPostsType } from '../types'

export const PartnersArticles: React.FC = () => {
  const [partnersArticle, setPartnersArticle] = useState<PartnersPostsType | null>(null)

  useEffect(() => {
    ;(async () => {
      const data = await getSortedPartnerArticle()
      setPartnersArticle(data)
    })()
  }, [])

  if (!partnersArticle) return null

  return (
    <>
      <section className="partner-article">
        <div className="container grid">
          <div className="partner-article-image-container">
            <img className="partner-article-image" src={partnersArticle.image} alt="Фотография статьи" />
          </div>

          <div className="partner-article-content">
            <span className="partner-article-caption">
              {`Партнерский материал от ${partnersArticle['company-name']}`}{' '}
            </span>
            <h2 className="partner-article-title">{partnersArticle.articleTitle}</h2>
            <p className="partner-article-text">{partnersArticle.description}</p>
          </div>
        </div>
      </section>
    </>
  )
}
