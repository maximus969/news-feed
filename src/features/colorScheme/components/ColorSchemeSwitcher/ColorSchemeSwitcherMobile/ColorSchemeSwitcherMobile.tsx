import { useColorScheme } from '@features/colorScheme/hooks'
import React, { FC } from 'react'
import { ColorSchemeSwitcherMenu } from '../ColorSchemeSwitcherMenu/ColorSchemeSwitcherMenu'
import { ColorSchemeSwitcherButton } from '../ColorSchemeSwitcherButton/ColorSchemeSwitcherButton'
import classNames from 'classnames'

interface Props {
  onClickSchemeButton: () => any
  isMenuActive: boolean
  onChangeScheme: () => any
}

export const ColorSchemeSwitcherMobile: FC<Props> = ({ onClickSchemeButton, isMenuActive, onChangeScheme }) => {
  const { userScheme, setUserScheme } = useColorScheme()

  return (
    <div
      className={classNames('color-scheme-switcher-mobile', { 'color-scheme-switcher-mobile--opened': isMenuActive })}
    >
      {isMenuActive ? (
        <ColorSchemeSwitcherMenu
          selectedScheme={userScheme}
          onChangeScheme={(scheme) => {
            setUserScheme(scheme)
            onChangeScheme()
          }}
        />
      ) : (
        <ColorSchemeSwitcherButton onClick={onClickSchemeButton} scheme={userScheme} />
      )}
    </div>
  )
}
