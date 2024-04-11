import React, { FC, createContext, useContext, useEffect, useState } from 'react'
import { NetworkStatusContext } from './types'

const context = createContext({
  online: true,
})

export const useNetworkStatusContext = (): NetworkStatusContext => {
  return useContext(context)
}

export const NetworkStatusContextProvider: FC = ({ children }) => {
  const [online, setOnline] = useState(window.navigator.onLine)
  useEffect(() => {
    window.addEventListener('online', () => setOnline(true))
    window.addEventListener('offline', () => setOnline(false))
  }, [online])
  return <context.Provider value={{ online }}>{children}</context.Provider>
}
