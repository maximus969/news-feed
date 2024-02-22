import React from 'react'
import './Hero.css'
import classNames from 'classnames'
import { Title } from '@components/Title/Title'

type HeroPropsType = {
  image?: string
  title: string
  text?: string
  className?: string
}

export const Hero: React.FC<HeroPropsType> = ({ image, title, text, className }) => {
  const hasImage = image && image.length > 0
  return (
    <section className={classNames('hero', { 'hero__no-image': !hasImage }, className)}>
      <div className="hero__in" style={{ backgroundImage: `url(${image})` }}>
        <div className="hero__container container">
          <div className="hero__content">
            <Title className="hero__title">{title}</Title>
            {text && text?.length > 0 && <p className="hero__text">{text}</p>}
          </div>
        </div>
      </div>
    </section>
  )
}
