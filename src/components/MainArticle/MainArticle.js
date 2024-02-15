import React from "react";
import './MainArticle.css'

export const MainArticle = ({
    title,
    image,
    description,
    category,
    source, 
    key
  }) => {
    return (
      <article className="main_article" key={key}>
        <div className="main_article_image_container">
          <img className="main_article_image" src={image} alt="Фото статьи" />
        </div>
        <div className="main_article_content">
          <span className="article_category main_article_category">{category}</span>
          <h2 className="main_article_title">{title}</h2>
          <p className="main_article_text">{description}</p>
          <span className="main_article_source">
            <a href="#">{source}</a>
          </span>
        </div>
      </article>
    )
  }