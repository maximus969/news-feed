import React from "react";
import './ShortArticle.css';

export const ShortArticle = ({ title, date, source, key }) => {
    return (
      <article className="short_article" key={key}>
        <h2 className="article_title">{title}</h2>
        <span className="article_date">
          {new Date(date).toLocaleDateString("ru-RU", {
            month: "long",
            day: "numeric",
          })}
        </span>
        <span className="article_source">
          <a href="#">{source}</a>
        </span>
      </article>
    )
  }