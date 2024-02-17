import React from 'react'
import { Navigation } from '../Navigation/Navigation'
import './Footer.css'

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <Navigation placement="footer" className="footer__navigation" />
        <div className="footer__bottom">
          <p className="footer__text">
            Сделано на Frontend курсе в{' '}
            <a rel="noreferrer" className="footer__link" href="https://karpov.courses/frontend" target="_blank">
              Karpov.Courses
            </a>
          </p>
          <p className="footer__text footer__text--gray">© 2021</p>
        </div>
      </div>
    </footer>
  )
}
