import React from 'react'
import './ArticleCard.css'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import { beautifyDate } from '../utils'
import { categoryNames } from '../../features/categories/types'
import { Source } from '../../features/Source/components/Source'
import { ImageComponent } from '@components/Image/ImageComponent'
import { useTranslation } from 'react-i18next'

type ArticleCardType = {
  id: number
  title: string
  image?: string
  category?: categoryNames
  description?: string
  source?: string
  date?: string
  className?: string
}

export const ArticleCard: React.FC<ArticleCardType> = ({
  id,
  title = '',
  image = '',
  category,
  description = '',
  source = '',
  date = '',
  className = '',
}) => {
  const hasDescription = description && description?.length > 0
  const hasImage = image && image.length > 0
  const { t, i18n } = useTranslation()
  return (
    <Link
      to={`/article/${id}`}
      className={classNames('article-card', { 'article-card__has-description': hasDescription }, className)}
    >
      <article className="article-card__in">
        {hasImage && <ImageComponent className="article-card__image" src={image} alt={title} />}
        <div className="article-card__content">
          <h3 className="article-card__title">{title}</h3>
          {hasDescription && <span className="article-card__description">{description}</span>}
          <div className="article-card__info">
            {category && category?.length > 0 && (
              <span className="article-card__category">{t(`category_${category}`)}</span>
            )}
            {date && date?.length > 0 && (
              <span className="article-card__date">{beautifyDate(date, i18n.language)}</span>
            )}
            {source && source.length > 0 && <Source>{source}</Source>}
          </div>
        </div>
      </article>
    </Link>
  )
}
