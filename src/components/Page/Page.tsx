import React from 'react'
import { Footer } from '../Footer/Footer'
import { Header } from '../Header/Header'

export const Page: React.FC = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}
