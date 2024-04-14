import React from 'react'
import { Navigation } from '../Navigation/Navigation'
import './Footer.css'
import { useTranslation } from 'react-i18next'

export const Footer: React.FC = () => {
  const { t } = useTranslation()
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <Navigation className="footer--navigation" />
        </div>
        <div className="footer--bottom">
          Сделано на Frontend курсе в &nbsp;
          <a
            rel="noreferrer"
            className="footer--link"
            dangerouslySetInnerHTML={{
              __html: t(`footer_link`, {
                link: `<a class="footer_link" href="https://karpov.courses/frontend" target="_blank"  rel="noreferrer">Karpov.Courses</a>, `,
              }),
            }}
          />
        </div>
      </div>
    </footer>
  )
}
