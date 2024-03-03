import React, { useState } from 'react'
import { Footer } from '../Footer/Footer'
import { Header } from '../Header/Header'
import { EmailModal } from '../EmailModal/EmailModal'

const LS_EMAIL_SHOWN_KEY = 'newsfeed:email_modal_shown'

export const Page: React.FC = ({ children }) => {
  const [emailModalShow, setEmailModalShow] = useState(!localStorage.getItem(LS_EMAIL_SHOWN_KEY))
  return (
    <>
      {emailModalShow && (
        <EmailModal
          onModalClose={() => {
            localStorage.setItem(LS_EMAIL_SHOWN_KEY, 'true')
            setEmailModalShow(false)
          }}
        />
      )}
      <Header />
      {children}
      <Footer />
    </>
  )
}
