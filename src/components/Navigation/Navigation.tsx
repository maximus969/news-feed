import React, { FC } from 'react'
import { categoryNames } from '../../utils'
import './Navigation.css'
import logo from '../../assets/logo.svg'
import { NavLink } from 'react-router-dom'

type NavigationType = {
  placement: string
  className: string
}

export const Navigation: FC<NavigationType> = ({ className = '', placement = 'header' }) => {
  return (
    <nav className={`grid navigation navigation--${placement} ${className}`}>
      <NavLink to="/" className="navigation--logo">
        <img className="navigation--logo-image" src={logo} alt="Логотип" />
      </NavLink>
      <ul className="navigation--list">
        {['index', 'fashion', 'technologies', 'sport', 'karpov'].map((item) => {
          return (
            <li className="navigation--item" key={item}>
              <NavLink
                to={`/${item}`}
                className={'navigation--link'}
                style={({ isActive }) => ({ color: isActive ? 'navigation--link--active' : '' })}
              >
                {categoryNames[item]}
              </NavLink>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
