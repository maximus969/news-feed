import React, { FC } from 'react'
import { ColorSchemeSwitcherMenu } from '../ColorSchemeSwitcherMenu/ColorSchemeSwitcherMenu'
import { ColorSchemeSwitcherButton } from '../ColorSchemeSwitcherButton/ColorSchemeSwitcherButton'
import { useColorScheme } from '@features/colorScheme/hooks'
import './ColorSchemeSwitcherMobile.css'

interface Props {
  onClickSchemeButton: () => any
  isMenuActive: boolean
}

export const ColorSchemeSwitcherMobile: FC<Props> = ({ onClickSchemeButton, isMenuActive }) => {
  const { userScheme, setUserScheme } = useColorScheme()

  return (
    <div className="color-scheme-switcher-mobile">
      {isMenuActive ? (
        <ColorSchemeSwitcherMenu selectedScheme={userScheme} onChangeScheme={(scheme) => setUserScheme(scheme)} />
      ) : (
        <ColorSchemeSwitcherButton onClick={onClickSchemeButton} scheme={userScheme} />
      )}
    </div>
  )
}
