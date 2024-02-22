import React from 'react'
import './Title.css'
import classNames from 'classnames'

type TitleType = {
  Component?: any
  className?: string
}

export const Title: React.FC<TitleType> = ({ className, Component = 'h1', children }) => {
  return <Component className={classNames('title', className)}>{children}</Component>
}
