import React, { FC } from 'react'
import { categoryTitles } from '../../utils'
import './Navigation.css'

import { Logo } from '@components/Logo/Logo'
import classNames from 'classnames'
import { NavLink } from 'react-router-dom'

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
      <Logo />
      <ul className="navigation--list">
        <NavigationItem title="Новости" />
        {Object.entries(categoryTitles).map(([name, title]) => {
          console.log('')
          return <NavigationItem key={name} name={name} title={title} />
        })}
      </ul>
    </nav>
  )
}
