import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import './common.css'
import { initializeAPI } from './api'
import { App } from './components/App/App'
import { AuthContextProvider } from './Features/Auth/AuthContextProvider'

const firebaseApp = initializeAPI()

const basename = process.env.FOR_GH_PAGES === 'true' ? '/news-feed/' : '/'

ReactDOM.render(
  <AuthContextProvider firebaseApp={firebaseApp}>
    <Router basename={basename}>
      <App />
    </Router>
  </AuthContextProvider>,
  document.getElementById('root')
)
