import React, { Dispatch, useEffect, useState } from 'react'
import { applyLocale, getSavedLocale } from '@features/locale/utils'
import { Locale } from '@features/locale/types'

export const useLocale = (): {
  locale: Locale
  setLocale: Dispatch<Locale>
} => {
  const [locale, setLocale] = useState<Locale>(getSavedLocale())

  useEffect(() => {
    applyLocale(locale)
  }, [locale])

  return { locale, setLocale }
}
