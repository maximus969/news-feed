import React, { useEffect } from 'react'
import { ColorSchemeSwitcherValues } from './types'
import {
  getSavedScheme,
  removeSavedScheme,
  applyColorScheme,
  getSystemColorScheme,
} from '../colorScheme/colorSchemeUtils'

const matchMedia = window.matchMedia('(prefers-color-scheme:dark)')

export const useColorScheme = (): {
  userScheme: ColorSchemeSwitcherValues
  setUserScheme: React.Dispatch<ColorSchemeSwitcherValues>
} => {
  const [userScheme, setUserScheme] = React.useState<ColorSchemeSwitcherValues>(getSavedScheme() || 'auto')

  useEffect(() => {
    if (userScheme === 'auto') {
      removeSavedScheme()
      applyColorScheme(getSystemColorScheme())
    } else {
      applyColorScheme(userScheme, true)
    }
  }, [userScheme])

  useEffect(() => {
    const systemColorSchemeListener = () => {
      if (userScheme === 'auto') {
        applyColorScheme(getSystemColorScheme())
      }
    }
    matchMedia.addEventListener('change', systemColorSchemeListener)

    return () => {
      matchMedia.removeEventListener('change', systemColorSchemeListener)
    }
  }, [userScheme])

  return { userScheme, setUserScheme }
}
