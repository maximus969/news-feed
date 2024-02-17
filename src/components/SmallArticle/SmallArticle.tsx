import React, { FC } from 'react'
import { beautifyDate } from '../../types'
import './SmallArticle.css'
import { Link } from 'react-router-dom'

type SmallArticleType = {
  title: string
  source?: string
  date: string
  id: number | null
}

export const SmallArticle: FC<SmallArticleType> = ({ title, source, date, id }) => {
  return (
    <Link to={`/article/${id}`} className="small-article">
      <article className="small-article-container">
        <h2 className="small-article__title">{title}</h2>
        <span className="article-date">{source}</span>
        <span className="article-source">{beautifyDate(date)}</span>
      </article>
    </Link>
  )
}
