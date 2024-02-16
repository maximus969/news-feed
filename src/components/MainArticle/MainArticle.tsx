import React from 'react';
import './MainArticle.css';

type MainArticleType = {
    title: string;
    image: string;
    category?: string;
    description: string;
    source?: string;
    onArticleClick: (e: React.MouseEvent<HTMLElement>) => void;
    articleId: number | null;
};

export const MainArticle = ({
    title,
    image,
    category,
    description,
    source,
    onArticleClick,
}: MainArticleType): any => {
    return (
        <article className="main-article" onClick={onArticleClick}>
            <div className="main-article__image-container">
                <img
                    className="article-img main-article__img"
                    src={image}
                    alt="Фото новости"
                />
            </div>
            <div className="main-article__content">
                <span className="article-category">{category}</span>
                <h2 className="main-article__title">{title}</h2>
                <p className="main-article__text">{description}</p>
                <span className="article-source main-article__caption">
                    {source}
                </span>
            </div>
        </article>
    );
};
