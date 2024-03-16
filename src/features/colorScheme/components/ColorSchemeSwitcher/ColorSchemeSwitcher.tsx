import React, { useEffect, useRef, useState } from 'react'
import './ColorSchemeSwitcher.css'
import { applyColorSceme, getSystemColorScheme, getSavedScheme, removeSavedScheme } from '../../colorSchemeUtils'
import { AutoScheme } from '@components/Icons/AutoScheme'
import { DarkScheme } from '@components/Icons/DarkScheme'
import { LightScheme } from '@components/Icons/LightScheme'
import { Dropdown } from '@components/Dropdown/Dropdown'
import mark from '../../../../images/mark.svg'

type colorSchemeValues = 'dark' | 'light' | 'auto'

const matchMedia = window.matchMedia('(prefers-color-scheme:dark)')

export const ColorSchemeSwitcher: React.FC = () => {
  const [userScheme, setUserScheme] = useState<colorSchemeValues>(getSavedScheme() || 'auto')
  const [dropdownShown, setDropdownShown] = useState(false)
  const targetRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (userScheme === 'auto') {
      removeSavedScheme()
      applyColorSceme(getSystemColorScheme())
    } else {
      applyColorSceme(userScheme, true)
    }
  }, [userScheme])

  useEffect(() => {
    const systemColorScheme = () => {
      if (userScheme === 'auto') {
        applyColorSceme(getSystemColorScheme())
      }
    }

    matchMedia.addEventListener('change', systemColorScheme)

    return () => {
      matchMedia.removeEventListener('change', systemColorScheme)
    }
  }, [userScheme])

  const onDropdownChange = () => {
    setDropdownShown(!dropdownShown)
  }

  return (
    <div className="color-scheme-switcher">
      <button className="color-scheme-switcher__value" ref={targetRef} onClick={onDropdownChange}>
        {userScheme === 'auto' && <AutoScheme />}
        {userScheme === 'dark' && <DarkScheme />}
        {userScheme === 'light' && <LightScheme />}
      </button>
      <Dropdown shown={dropdownShown} onShownChange={setDropdownShown} targetRef={targetRef}>
        <button className="color-scheme-switcher__option" onClick={() => setUserScheme('auto')}>
          <AutoScheme />
          <span className="color-scheme-switcher__text">Auto</span>
          {userScheme === 'auto' && <img className="color-scheme-switcher__mark" src={mark} alt="Выбранная тема" />}
        </button>

        <button className="color-scheme-switcher__option" onClick={() => setUserScheme('dark')}>
          <DarkScheme />
          <span className="color-scheme-switcher__text">Темная</span>
          {userScheme === 'dark' && <img className="color-scheme-switcher__mark" src={mark} alt="Выбранная тема" />}
        </button>

        <button className="color-scheme-switcher__option" onClick={() => setUserScheme('light')}>
          <LightScheme />
          <span className="color-scheme-switcher__text">Светлая</span>
          {userScheme === 'light' && <img className="color-scheme-switcher__mark" src={mark} alt="Выбранная тема" />}
        </button>
      </Dropdown>
    </div>
  )
}
