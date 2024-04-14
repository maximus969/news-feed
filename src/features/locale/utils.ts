import { Locale } from '@features/locale/types'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './translations/en.json'
import ru from './translations/ru.json'

const LS_LOCALE_KEY = 'newsfeed:locale'

export const applyLocale = (locale: Locale): void => {
  localStorage.setItem(LS_LOCALE_KEY, locale)
  i18n.changeLanguage(locale)
}

export const getSavedLocale = (): Locale => {
  const localSttorageLang = localStorage.getItem(LS_LOCALE_KEY) as Locale | null

  if (localSttorageLang) {
    return localSttorageLang
  }

  const navigatorLanguage = window.navigator.language.split('-')[0] as Locale

  if (Object.values(Locale).includes(navigatorLanguage)) {
    return navigatorLanguage
  }

  return Locale.en
}

export const initI18n = (callback: () => any): void => {
  const currentLocale = getSavedLocale()

  i18n.use(initReactI18next).init(
    {
      resources: {
        en: {
          translation: en,
        },
        ru: {
          translation: ru,
        },
      },
      lng: currentLocale,
      fallbackLng: Locale.en,
      interpolation: {
        escapeValue: false,
        prefix: '{',
        suffix: '}',
      },
    },
    () => {
      applyLocale(currentLocale)
      callback()
    }
  )
}
