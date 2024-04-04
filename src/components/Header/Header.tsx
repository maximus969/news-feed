import React, { FC } from 'react'
import './Header.css'
import { useAdaptive } from '@components/customHooks'
import { MobileHeader } from './MobileHeader/MobileHeader'
import { DesktopHeader } from './DesktopHeader/DesktopHeader'

export const Header: FC = () => {
  const { isMobile } = useAdaptive()

  return isMobile ? <MobileHeader /> : <DesktopHeader />
}
