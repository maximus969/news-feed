import React from 'react'
import classNames from 'classnames'
import { Title } from '@components/Title/Title'
import { ImageComponent } from '@components/Image/ImageComponent'
import { SkeletonText } from '../Skeleton/SkeletonText'
import './Hero.css'

type HeroSkeletonType = {
  hasImage?: boolean
  title?: string
  hasText?: boolean
  className?: string
}

export const HeroSkeleton: React.FC<HeroSkeletonType> = ({ hasImage = true, title, hasText = true, className }) => {
  return (
    <section className={classNames('hero', { 'hero__no-image': !hasImage }, className)}>
      <div className="hero__in">
        {hasImage && <ImageComponent className="hero__image" skeleton />}
        <div className="hero__container container">
          <div className="hero__content" style={{ width: title ? undefined : '100%' }}>
            <Title className="hero__title">{title || <SkeletonText dark />}</Title>
            {hasText && (
              <p className="hero__text">
                <SkeletonText rowsCount={2} dark />
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
