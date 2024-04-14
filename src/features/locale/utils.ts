import { Locale } from '@features/locale/types'

const keys = {
  [Locale.en]: {
    homepage_trends_title: 'Trends',
  },
}

const LS_LOCALE_KEY = 'newsfeed:locale'

export const applyLocale = (locale: Locale): void => {
  localStorage.setItem(LS_LOCALE_KEY, locale)
}

export const getSavedLocale = (): Locale => {
  const lsLocale = localStorage.getItem(LS_LOCALE_KEY)

  if (lsLocale) {
    return lsLocale as Locale
  }

  const language = window.navigator.language
  const locale = language.split('-')[0] as Locale

  return Object.values(Locale).includes(locale) ? locale : Locale.en
}

export const initI18n = (callback: () => any): void => {
  const currentLocale = getSavedLocale()

  applyLocale(currentLocale || Locale.en)

  callback()
}
