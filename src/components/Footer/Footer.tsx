import React from 'react'
import { Navigation } from '../Navigation/Navigation'
import './Footer.css'

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <Navigation className="footer--navigation" />
        </div>
        <div className="footer--bottom">
          Сделано на Frontend курсе в &nbsp;
          <a rel="noreferrer" className="footer--link" href="https://karpov.courses/frontend" target="_blank">
            Karpov.Courses
          </a>
        </div>
      </div>
    </footer>
  )
}
