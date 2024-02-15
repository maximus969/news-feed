import React from 'react'
import { Navigation } from '../Navigation/Navigation.js'
import './Footer.css'

export const Footer = ({ onNavClick, category}) => {
  return (
    <footer className="footer">
    <div className="container">
      <Navigation 
      className={'footer_navigation_link'}
      onNavClick={onNavClick}
      category={category}
      />
      <div className="footer_additional_links">
        <span className="footer_courses_link">
          Сделано на Frontend курсе в
          <a
            href="https://karpov.courses/frontend"
            className="course_link"
            target="_blank"
          >
            Karpov.Courses
          </a>
        </span>
        <span className="copyright_year">© 2021</span>
      </div>
    </div>
  </footer>
  )
}
