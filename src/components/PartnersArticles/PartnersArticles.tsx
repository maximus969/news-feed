import React, { useEffect, useState } from 'react'
import { getSortedPartnerArticle } from '../../api'
import { IPartnersPosts } from '../../types'
import './PartnersArticles.css'

export const PartnersArticles: React.FC = () => {
  const [partnersArticle, setPartnersArticle] = useState<IPartnersPosts | null>(null)

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
