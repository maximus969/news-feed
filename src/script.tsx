import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import './common.css'
import { App } from './components/App/App'

const basename = process.env.FOR_GH_PAGES === 'true' ? '/news-feed' : undefined

ReactDOM.render(
  <Router basename={basename}>
    <App />
  </Router>,
  document.getElementById('root')
)
