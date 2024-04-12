import React, { FC, useRef, useState } from 'react'
import { ColorSchemeSwitcherButton } from '../ColorSchemeSwitcherButton/ColorSchemeSwitcherButton'
import { Dropdown } from '@components/Dropdown/Dropdown'
import { ColorSchemeSwitcherMenu } from '../ColorSchemeSwitcherMenu/ColorSchemeSwitcherMenu'
import { useColorScheme } from '../../../hooks'
import './ColorSchemeSwitcherDesktop.css'

export const ColorSchemeSwitcherDesktop: FC = () => {
  const { userScheme, setUserScheme } = useColorScheme()
  const [dropdownShown, setDropdownShown] = useState(false)
  const targetRef = useRef<HTMLButtonElement>(null)

  return (
    <div className="color-scheme-switcher">
      <ColorSchemeSwitcherButton
        onClick={(event) => {
          event.stopPropagation()
          setDropdownShown(!dropdownShown)
        }}
        ref={targetRef}
        scheme={userScheme}
      />
      <Dropdown shown={dropdownShown} onShownChange={setDropdownShown} targetRef={targetRef}>
        <ColorSchemeSwitcherMenu
          className="color-scheme-switcher__dropdown-menu"
          selectedScheme={userScheme}
          onChangeScheme={(scheme) => setUserScheme(scheme)}
        />
      </Dropdown>
    </div>
  )
}
