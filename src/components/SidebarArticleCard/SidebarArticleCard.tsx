import React from 'react'
import './SidebarArticleCard.css'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import { beautifyDate } from '../../types'

type ArticleCardType = {
  id: string
  title: string
  source: string
  image: string
  date: string
  className?: string
}

export const SidebarArticleCard: React.FC<ArticleCardType> = ({ id, title, source, image, date, className }) => {
  return (
    <>
      <Link to={`/article/${id}`} className={classNames('sidebar-article-card', className)}>
        <div className="sidebar-article-card__media">
          <img className="sidebar-article-card__image" src={image} alt="Изображение карточки новости" />
          <div className="sidebar-article-card__date">{beautifyDate(date)}</div>
        </div>
        <h3 className="sidebar-article-card__title">{title}</h3>
        <div className="sidebar-article-card__source">{source}</div>
      </Link>
    </>
  )
}
