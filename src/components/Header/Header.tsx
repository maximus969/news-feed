import React from 'react'
import { Navigation } from '../Navigation/Navigation'
import './Header.css'

export const Header: React.FC = () => {
  return (
    <div>
      <header className="header">
        <div className="container">
          <Navigation placement="header" className="header__navigation" />
        </div>
      </header>
    </div>
  )
}
