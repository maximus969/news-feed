import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import './SingleLineTitleArticle.css'

interface SingleLineTitleArticleProp {
  image: string
  category: string
  title: string
  source: string
  text: string
  id: number | string
}

export const SingleLineTitleArticle: FC<SingleLineTitleArticleProp> = ({
  image,
  category,
  title,
  text,
  source,
  id,
}) => {
  return (
    <Link to={`/article/${id}`} className="single-line-title-article">
      <article className="single-line-title-article-container">
        <img className="single-line-title-article__image" src={image} />
        <span className="article-category single-line-title-article__category">{category}</span>
        <h2 className="single-line-title-article__title">{title}</h2>
        <p className="single-line-title-article__text">{text}</p>
        <span className="article-source single-line-title-article__source">{source}</span>
      </article>
    </Link>
  )
}
