import React from 'react'
import './SidebarArticleCard.css'
import classNames from 'classnames'
import { ImageComponent } from '@components/Image/ImageComponent'
import { SkeletonText } from '@components/Skeleton/SkeletonText'

type SidebarArticleCardSkeletonType = {
  className?: string
}

export const SidebarArticleCardSkeleton: React.FC<SidebarArticleCardSkeletonType> = ({ className }) => {
  return (
    <div className={classNames('sidebar-article-card', className)}>
      <article className="sidebar-article-card__in">
        <div className="sidebar-article-card__media">
          <ImageComponent className="sidebar-article-card__image" skeleton />
        </div>
        <h3 className="sidebar-article-card__title">
          <SkeletonText rowsCount={3} />
        </h3>
        <div className="sidebar-article-card__source">
          <SkeletonText />
        </div>
      </article>
    </div>
  )
}
