import React, { useEffect, useState } from 'react'
import './Article.css'
import { RelatedSmallArticle } from '../RelatedSmallArticle/RelatedSmallArticle'
import { SingleLineTitleArticle } from '../SingleLineTitleArticle/SingleLineTitleArticle'
import { ArticleItem, beautifyDate, Categories, Items, RelatedArticleItem, Sources } from '../../types'

interface Article {
  id: number
  categories: Categories[]
  sources: Sources[]
  onArticleClick: (id: number) => void
}

export const Article: React.FC<Article> = ({ id, categories, sources, onArticleClick }) => {
  const [articleItem, setArticleItem] = useState<ArticleItem | null>(null)
  const [relatedArticle, setRelatedArticle] = useState<Items[] | null>(null)

  useEffect(() => {
    fetch(`https://frontend.karpovcourses.net/api/v2/news/full/${id}`)
      .then((response) => response.json())
      .then(setArticleItem)

    fetch(`https://frontend.karpovcourses.net/api/v2/news/related/${id}?counts=9`)
      .then((response) => response.json())
      .then((response: RelatedArticleItem) => setRelatedArticle(response.items))
  }, [id])

  if (articleItem === null || relatedArticle === null) {
    return null
  }

  return (
    <section className="article-page">
      <article className="article">
        {articleItem?.image?.length ? (
          <section
            className="article__hero"
            style={{
              backgroundImage: `url(${articleItem?.image})`,
            }}
          >
            <div className="container article__hero-content">
              <div className="grid">
                <h1 className="article__hero-title">{articleItem?.title}</h1>
              </div>

              <div className="grid">
                <span className="article-category article__category">{articleItem?.category?.name}</span>
                <span className="article-date article__date">{beautifyDate(articleItem?.date)}</span>
              </div>
            </div>
          </section>
        ) : null}

        <div className="grid container article__main">
          <div className="article__content">
            {!articleItem?.image?.length && (
              <div className="article__title-container">
                <h1 className="article__title">{articleItem?.title}</h1>

                <div className="grid">
                  <span className="article-category article__category">{articleItem?.category?.name}</span>
                  <span className="article-date article__date">{beautifyDate(articleItem?.date)}</span>
                </div>
              </div>
            )}

            <p>{articleItem?.text}</p>
            <p>{articleItem?.text}</p>
            <img src={articleItem?.image} />
            <p>{articleItem?.text}</p>
            <img src={articleItem?.image} />
          </div>

          <div className="article__small-column">
            {relatedArticle?.slice(3, 9)?.map((article) => {
              const category = categories?.find(({ id }) => article?.category_id === id)
              const source = sources?.find(({ id }) => article?.source_id === id)
              return (
                <RelatedSmallArticle
                  key={article.id}
                  source={source?.name || ''}
                  title={article.title}
                  image={article.image}
                  category={category?.name || ''}
                  onArticleClick={() => onArticleClick(article.id)}
                />
              )
            })}
          </div>
        </div>
      </article>

      <section className="article-page__related-articles">
        <div className="container">
          <h2 className="article-page__related-articles-title">{articleItem?.title}</h2>

          <div className="grid article-page__related-articles-list">
            {relatedArticle?.slice(0, 3).map((article) => {
              const category = categories?.find(({ id }) => article?.category_id === id)
              const source = sources?.find(({ id }) => article?.source_id === id)
              return (
                <SingleLineTitleArticle
                  key={article.id}
                  image={article.image}
                  source={source?.name || ''}
                  category={category?.name || ''}
                  text={article.description}
                  title={article.title}
                  onArticleClick={() => onArticleClick(article.id)}
                />
              )
            })}
          </div>
        </div>
      </section>
    </section>
  )
}
