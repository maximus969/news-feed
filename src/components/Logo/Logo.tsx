import React from 'react'
import './Logo.css'
import { NavLink } from 'react-router-dom'
import logo from '../../assets/logo.svg'

export const Logo: React.FC = () => {
  return (
    <NavLink to={'/'} className={'logo'}>
      <img src={logo} alt="Логотип" className="logo-image" />
    </NavLink>
  )
}
