import React, { FC } from 'react';
import './RelatedSmallArticle.css';

interface RelatedArticleProp {
  image: string;
  category: string;
  title: string;
  source: string;
  onArticleClick: (e: React.MouseEvent<HTMLElement>) => void;
}

export const RelatedSmallArticle: FC<RelatedArticleProp> = ({ image, category, title, source, onArticleClick }) => {
  return (
    <article className="related-small-article" onClick={onArticleClick}>
      <img className="related-small-article__image" src={image} />
      <div className="related-small-article__content">
        <span className="article-category related-small-article__category">{category}</span>
        <h2 className="related-small-article__title">{title}</h2>
        <span className="article-source related-small-article__source">{source}</span>
      </div>
    </article>
  );
};
