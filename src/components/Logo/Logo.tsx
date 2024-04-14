import React from 'react'
import './Logo.css'
import { NavLink } from 'react-router-dom'
import logo from '../../images/logo.svg'
import { useTranslation } from 'react-i18next'

export const Logo: React.FC = () => {
  const { t } = useTranslation()
  return (
    <NavLink to={'/'} className={'logo'}>
      <img src={logo} alt={t(`logo_main`)} className="logo-image" />
    </NavLink>
  )
}
