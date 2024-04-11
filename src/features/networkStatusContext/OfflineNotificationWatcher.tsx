import React, { FC } from 'react'
import { useNetworkStatusContext } from './NetworkStatusContextProvider'
import { OfflineNotification } from '@components/OfflineNotification/OfflineNotification'
import { CSSTransition } from 'react-transition-group'
import './OfflineNotificationWatcher.css'

export const OfflineNotificationWatcher: FC = () => {
  const { online } = useNetworkStatusContext()

  return (
    <CSSTransition
      classNames={'offline-notification-animation'}
      in={!online}
      timeout={200}
      mountOnEnter={true}
      unmountOnExit={true}
    >
      {!online && <OfflineNotification />}
    </CSSTransition>
  )
}
