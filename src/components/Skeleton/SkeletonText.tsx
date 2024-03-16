import React from 'react'
import './SkeletonText.css'
import classNames from 'classnames'
import { repeat } from '@components/utils'

interface SkeletonTextType {
  rowsCount?: number
  dark?: boolean
}

export const SkeletonText: React.FC<SkeletonTextType> = ({ rowsCount = 1, dark = false }) => {
  return (
    <div className={classNames('skeleton-text', { 'skeleton-text--dark': dark })}>
      {repeat((i) => {
        return <span key={i} className="skeleton-text__row skeleton-gradient"></span>
      }, rowsCount)}
    </div>
  )
}
