import React, { FC } from 'react'
import './Navigation.css'
import classNames from 'classnames'
import { NavLink } from 'react-router-dom'
import { categoryTitles } from '../../features/categories/constants'

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
  return (
    <nav className={classNames('navigation', className)}>
      <ul className="navigation--list">
        <NavigationItem title="Новости" />
        {Object.entries(categoryTitles)
          .slice(0, 5)
          .map(([name, title]) => {
            return <NavigationItem key={name} name={name} title={title} />
          })}
      </ul>
    </nav>
  )
}
