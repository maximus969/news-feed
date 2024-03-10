import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import './common.css'
import { initializeAPI } from './api'
import { App } from './App/App'
import { Provider } from 'react-redux'
import { store } from './store'
import { AuthContextProvider } from '../features/Auth/AuthContextProvider'

const firebaseApp = initializeAPI()

const basename = process.env.FOR_GH_PAGES === 'true' ? '/news-feed/' : '/'

ReactDOM.render(
  <Provider store={store}>
    <AuthContextProvider firebaseApp={firebaseApp}>
      <Router basename={basename}>
        <App />
      </Router>
    </AuthContextProvider>
  </Provider>,
  document.getElementById('root')
)
