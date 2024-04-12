import React from 'react'
import './Logo.css'
import { NavLink } from 'react-router-dom'
import logo from '../../images/logo.svg'

export const Logo: React.FC = () => {
  return (
    <NavLink to={'/'} className={'logo'}>
      <img src={logo} alt="Главная страница" className="logo-image" />
    </NavLink>
  )
}
