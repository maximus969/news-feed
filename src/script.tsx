import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import './common.css'
import { App } from './components/App/App'

const isForGHPages = process.env.GH_PAGES === 'true'

ReactDOM.render(
  <>
    {isForGHPages ? (
      <HashRouter>
        <App />
      </HashRouter>
    ) : (
      <BrowserRouter>
        <App />
      </BrowserRouter>
    )}
  </>,
  document.getElementById('root')
)
