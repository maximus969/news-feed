import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import './common.css'
import { initializeAPI } from './api'
import { App } from './components/App/App'

initializeAPI()

const basename = process.env.FOR_GH_PAGES === 'true' ? '/news-feed/' : '/'

ReactDOM.render(
  <Router basename={basename}>
    <App />
  </Router>,
  document.getElementById('root')
)
