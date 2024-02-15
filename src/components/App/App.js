import React, { useEffect, useState, Fragment } from 'react';
import { Navigation } from '../Navigation/Navigation.js';
import { Articles } from '../Articles/Articles.js';
import { Footer } from '../Footer/Footer.js'
import { categoryIds } from '../../utils.js';
import './App.css'


export const App = () => {
    const [category, setCategory] = useState("index");
    const [articles, setArticles] = useState({
      items: [],
      categories: [],
      sources: [],
    })
  
    const onNavClick = (e) => {
      e.preventDefault();
      setCategory(e.currentTarget.dataset.href);
    }
   
    useEffect(() => {
      fetch(
        "https://frontend.karpovcourses.net/api/v2/ru/news/" +
          categoryIds[category] || ""
      )
        .then((res) => res.json())
        .then((response) => {
          setArticles(response);
        });
    }, [category])
  
    return (
      <Fragment>
        <header className="header">
          <div className="container">
          <Navigation category={category} onNavClick={onNavClick} className={'navigation_link'} />
          </div>
        </header>
  
        <main className="main">
          <Articles articles={articles}/>
        </main>
  
       <Footer onNavClick={onNavClick} category={category} />
      </Fragment>
    );
  };
  