import { categoryName } from "../../utils.js";
import React from "react";
import './Navigation.css'
import  logo  from '../../../assets/logo.svg'

export const Navigation = ({ category, onNavClick, className }) => {
    return (
      <nav className="navigation grid">
      <a href="#" data-href="index" className="navigation_logo">
        <img src={logo} alt="Логотип" className="logo_image" />
      </a>
      <ul className="navigation_list">
        {["index", "fashion", "technology", "politics",  "sport", "karpov"].map((item) => {
          return (
            <li className="navigation_item" key={item}>
              <a
                onClick={onNavClick}
                href="#"
                className={`${className} ${
                  category === item ? "navigation_link--active" : ""
                }`}
                data-href={item}
              >
                {categoryName[item]}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
    )
  }