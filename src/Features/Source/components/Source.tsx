import React from 'react'
import classNames from 'classnames'

type SourceType = {
  className?: string
  href?: string
}

export const Source: React.FC<SourceType> = ({ children = 'Источник', className, href }) => {
  return href ? (
    <a href={href} target="_blank" rel="noreferrer" className={classNames('source', 'source__link', className)}>
      {children}
    </a>
  ) : (
    <span className={classNames('source', className)}>{children}</span>
  )
}
