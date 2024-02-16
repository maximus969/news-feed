import React, { useState, useEffect } from 'react';
import { categoryIds } from '../../utils';
import { Navigation } from '../Navigation/Navigation';
import { Articles } from '../Articles/Articles';
import { Article } from '../Article/Article';
import './App.css';
import { NewsResponse } from '../../types';

export const App: React.FC = () => {
    const [category, setCategory] = useState<string>('index');
    const [articles, setArticles] = useState<NewsResponse>({
        items: [],
        categories: [],
        sources: [],
    });
    const [articleId, setArticleId] = useState<number | null>(null);

    const onNavClick = (e: React.MouseEvent<HTMLElement>): void => {
        e.preventDefault();
        setArticleId(null);
        const categoryLink = e.currentTarget?.dataset?.href;
        categoryLink && setCategory(categoryLink);
    };
    const onArticleClick = (id: number) => {
        setArticleId(id);
    };

    useEffect(() => {
        fetch(
            'https://frontend.karpovcourses.net/api/v2/ru/news/' +
                categoryIds[category] || ''
        )
            .then((response) => response.json())
            .then((response: NewsResponse) => {
                setArticles(response);
            });
    }, [category]);

    return (
        <React.Fragment>
            <header className="header">
                <div className="container">
                    <Navigation
                        placement="header"
                        className="header__navigation"
                        onNavClick={onNavClick}
                        currentCategory={category}
                    />
                </div>
            </header>

            <main>
                {articleId !== null ? (
                    <Article
                        id={articleId}
                        categories={articles.categories}
                        sources={articles.sources}
                        onArticleClick={onArticleClick}
                    />
                ) : (
                    <Articles
                        articles={articles}
                        onArticleClick={onArticleClick}
                        articleId={articleId}
                    />
                )}
            </main>

            <footer className="footer">
                <div className="container">
                    <Navigation
                        placement="footer"
                        onNavClick={onNavClick}
                        currentCategory={category}
                        className="footer__navigation"
                    />
                    <div className="footer__bottom">
                        <p className="footer__text">
                            Сделано на Frontend курсе в{' '}
                            <a
                                rel="noreferrer"
                                className="footer__link"
                                href="https://karpov.courses/frontend"
                                target="_blank"
                            >
                                Karpov.Courses
                            </a>
                        </p>
                        <p className="footer__text footer__text--gray">
                            © 2021
                        </p>
                    </div>
                </div>
            </footer>
        </React.Fragment>
    );
};
