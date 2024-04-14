import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import './common.css'
import { initializeAPI } from './api'
import { App } from './App/App'
import { Provider } from 'react-redux'
import { store } from './store'
import { AuthContextProvider } from '../features/Auth/AuthContextProvider'
import { NetworkStatusContextProvider } from '@features/networkStatusContext/NetworkStatusContextProvider'
import { initI18n } from '@features/locale/utils'

const firebaseApp = initializeAPI()

const basename = process.env.FOR_GH_PAGES === 'true' ? '/news-feed/' : '/'

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/serviceWorker.js')
    .then(() => console.log('service worker is ready'))
    .catch(() => console.log('some error has occured'))
}

initI18n(() => {
  ReactDOM.render(
    <Provider store={store}>
      <NetworkStatusContextProvider>
        <AuthContextProvider firebaseApp={firebaseApp}>
          <Router basename={basename}>
            <App />
          </Router>
        </AuthContextProvider>
      </NetworkStatusContextProvider>
    </Provider>,
    document.getElementById('root')
  )
})
