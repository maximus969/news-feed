import React from 'react'
import { beautifyDate } from '../../types'
import './ArticleItemInfo.css'

interface IArtcileInfo {
  categoryName?: string
  date: string
  sourceLink?: string
  sourceName?: string
  author?: string
}

export const ArticleItemInfo: React.FC<IArtcileInfo> = ({ categoryName, date, sourceLink, sourceName, author }) => {
  return (
    <div className="grid">
      <div className="article-item-info-category_container">
        <span className="article-category article-item-info-category">{categoryName}</span>
        {sourceLink && (
          <a className="article-item-info-link" href={sourceLink} target="_blank" rel="noreferrer">
            Источник: {sourceName}
            {author && <span className="article-item-info-author">({author})</span>}
          </a>
        )}
        <span className="article-date article-item-info-date">{beautifyDate(date)}</span>
      </div>
    </div>
  )
}
