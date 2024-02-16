import React, { FC } from 'react';
import { beautifyDate } from '../../types';
import './SmallArticle.css';

type SmallArticleType = {
  title: string;
  source?: string;
  date: string;
  onArticleClick: (e: React.MouseEvent<HTMLElement>) => void;
  articleId: number | null;
};

export const SmallArticle: FC<SmallArticleType> = ({ title, source, date, onArticleClick }) => {
  return (
    <article className="small-article" onClick={onArticleClick}>
      <h2 className="small-article__title">{title}</h2>
      <span className="article-date">{source}</span>
      <span className="article-source">{beautifyDate(date)}</span>
    </article>
  );
};
