import React from 'react'
import { Navigation } from '../Navigation/Navigation'
import './Header.css'
import { ColorSchemeSwitcher } from '../../features/colorScheme/components/ColorSchemeSwitcher/ColorSchemeSwitcher'

export const Header: React.FC = () => {
  return (
    <div>
      <header className="header">
        <div className="container header-container">
          <Navigation className="header--navigation" />
          <div className="header-controls">
            <ColorSchemeSwitcher />
          </div>
        </div>
      </header>
    </div>
  )
}
