import React from 'react'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'

type SourceType = {
  className?: string
  href?: string
}

export const Source: React.FC<SourceType> = ({ children = 'Источник', className, href }) => {
  const { t } = useTranslation()
  return href ? (
    <a href={href} target="_blank" rel="noreferrer" className={classNames('source', 'source__link', className)}>
      {children || t(`source_placeholder`)}
    </a>
  ) : (
    <span className={classNames('source', className)}>{children || t(`source_placeholder`)}</span>
  )
}
