import React, { FC } from 'react'
import './Navigation.css'
import classNames from 'classnames'
import { NavLink } from 'react-router-dom'
import { categoryNames } from '@features/categories/types'
import { useTranslation } from 'react-i18next'
import { Locale } from '@features/locale/types'

type NavigationType = {
  className: string
}

type NavigationItemType = {
  name?: string
  title?: string
}

export const NavigationItem: React.FC<NavigationItemType> = ({ name = '', title }) => {
  return (
    <>
      <li className="navigation--item" key={name}>
        <NavLink
          to={`/${name}`}
          className={'navigation--link'}
          style={({ isActive }) => ({ color: isActive ? 'navigation--link active' : '' })}
        >
          {title}
        </NavLink>
      </li>
    </>
  )
}

export const Navigation: FC<NavigationType> = ({ className = '' }) => {
  const { t, i18n } = useTranslation()
  return (
    <nav className={classNames('navigation', className)}>
      <ul className="navigation--list">
        <NavigationItem title={t(`category_news`)} />
        {Object.values(categoryNames)
          .filter((name) => {
            if (i18n.language === Locale.ru) {
              return true
            }
            return name !== categoryNames['karpov']
          })
          .slice(0, 5)
          .map((name) => {
            return <NavigationItem key={name} name={name} title={t(`category_${name}`)} />
          })}
      </ul>
    </nav>
  )
}
