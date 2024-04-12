import React from 'react'
import classNames from 'classnames'
import { ImageComponent } from '@components/Image/ImageComponent'

import './ArticleCard.css'
import { SkeletonText } from '@components/Skeleton/SkeletonText'

type ArticleCardSkeletonType = {
  hasImage?: boolean
  hasDescription?: boolean
  className?: string
}

export const ArticleCardSkeleton: React.FC<ArticleCardSkeletonType> = ({
  hasImage = true,
  hasDescription = true,
  className = '',
}) => {
  return (
    <div
      className={classNames(
        'article-card',
        'article-card--skeleton',
        { 'article-card__has-description': hasDescription },
        className
      )}
    >
      <article className="article-card__in">
        {hasImage && <ImageComponent className="article-card__image" skeleton />}
        <div className="article-card__content">
          <h2 className="article-card__title">
            <SkeletonText rowsCount={2} />
          </h2>
          {hasDescription && (
            <span className="article-card__description">
              <SkeletonText rowsCount={2} />
            </span>
          )}
          <div className="article-card__info">
            <SkeletonText />
          </div>
        </div>
      </article>
    </div>
  )
}
