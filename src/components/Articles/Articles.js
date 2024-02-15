import React from "react";
import { MainArticle } from "../MainArticle/MainArticle.js"
import { ShortArticle } from "../ShortArticle/ShortArticle.js"
import './Article.css'


export const Articles = ({ articles }) => {
    return (
  <section className="articles">
            <div className="container grid">
           
              <section className="articles_main">
                {articles?.items?.slice(0, 3).map((item) => {
                  return (
                    <MainArticle
                      key={item.id}
                      category={
                        articles?.categories?.find(
                          ({ id }) => item?.category_id === id
                        )?.name
                      }
                      source={
                        articles?.sources?.find(({ id }) => item.source_id === id)
                          ?.name
                      }
                      description={item.description}
                      title={item.title}
                      image={item.image}
                    />
                  );
                })}
              </section>
              <section className="articles_short">
                {articles?.items?.slice(3, 12).map((item) => {
                  return (
                    <ShortArticle
                      //key={item.title}
                      title={item?.title}
                      date={item?.date}
                      source={
                        articles?.sources?.find(
                          ({ id }) => item?.source_id === id
                        )?.name
                      }
                    />
                  );
                })}
              </section>
            </div>
          </section>
    )
  }