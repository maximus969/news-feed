import React, { useRef, useState } from 'react'
import './LocaleSwitcherDesktop.css'
import { useLocale } from '@features/locale/hooks'
import { Dropdown } from '@components/Dropdown/Dropdown'
import { LocaleSwitcherMenu } from '../LocaleSwitcherMenu/LocaleSwitcherMenu'
import { LocaleSwitcherButton } from '../LocaleSwitcherButton/LocaleSwitcherButton'

export const LocaleSwitcherDesktop: React.FC = () => {
  const { locale, setLocale } = useLocale()
  const [dropdownShown, setDropdownShown] = useState(false)
  const targetRef = useRef<HTMLButtonElement>(null)

  return (
    <div className="locale-switcher">
      <LocaleSwitcherButton
        onClick={(event) => {
          event.stopPropagation()
          setDropdownShown(!dropdownShown)
        }}
        ref={targetRef}
        locale={locale}
        opened={dropdownShown}
      />

      <Dropdown shown={dropdownShown} onShownChange={setDropdownShown} targetRef={targetRef}>
        <LocaleSwitcherMenu
          className="locale-switcher__dropdown-menu"
          selectedLocale={locale}
          onChangeLocale={(locale) => setLocale(locale)}
        />
      </Dropdown>
    </div>
  )
}
