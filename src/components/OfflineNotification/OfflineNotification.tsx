import React, { FC } from 'react'
import './OfflineNotification.css'

export const OfflineNotification: FC = () => {
  return (
    <div className="offline-notification" role="status">
      Сайт работает в оффлайн. Проверьте доступность сети.
    </div>
  )
}
