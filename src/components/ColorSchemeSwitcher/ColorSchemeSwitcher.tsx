import React, { useEffect, useState } from 'react'
import './ColorSchemeSwitcher.css'
import { applyColorSceme, getSystemColorScheme, getSavedScheme, removeSavedScheme } from '../../colorSchemeUtils'

type colorSchemeValues = 'dark' | 'light' | 'auto'

const matchMedia = window.matchMedia('(prefers-color-scheme:dark)')

export const ColorSchemeSwitcher: React.FC = () => {
  const [userScheme, setUserScheme] = useState<colorSchemeValues>(getSavedScheme() || 'auto')

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

  return (
    <select
      className={'color-scheme-switcher'}
      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setUserScheme(e.target.value as colorSchemeValues)}
      value={userScheme}
    >
      <option value="dark">Dark</option>
      <option value="light">Light</option>
      <option value="auto">Auto</option>
    </select>
  )
}
