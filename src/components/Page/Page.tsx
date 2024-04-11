import React, { useState } from 'react'
import { Footer } from '../Footer/Footer'
import { Header } from '../Header/Header'
import { EmailModal } from '../EmailModal/EmailModal'
import { OfflineNotificationWatcher } from '@features/networkStatusContext/OfflineNotificationWatcher'

const LS_EMAIL_SHOWN_KEY = 'newsfeed:email_modal_shown'

export const Page: React.FC = ({ children }) => {
  const [emailModalShow, setEmailModalShow] = useState(!localStorage.getItem(LS_EMAIL_SHOWN_KEY))

  return (
    <>
      <EmailModal
        shown={emailModalShow}
        onModalClose={() => {
          localStorage.setItem(LS_EMAIL_SHOWN_KEY, 'true')
          setEmailModalShow(false)
        }}
      />
      <Header />
      {children}
      <Footer />
      <OfflineNotificationWatcher />
    </>
  )
}
