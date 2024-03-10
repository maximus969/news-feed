export const applyColorSceme = (scheme: 'light' | 'dark', persist = false): void => {
  document.documentElement.setAttribute('scheme', scheme)
  persist && localStorage.setItem(LS_COLOR_SCHEME_KEY, scheme)
}

export const getSystemColorScheme = (): 'dark' | 'light' => {
  return window.matchMedia('(prefers-color-scheme:dark)').matches ? 'dark' : 'light'
}

const LS_COLOR_SCHEME_KEY = 'newsfeed:scheme'

export const getSavedScheme = (): 'dark' | 'light' | null => {
  return localStorage.getItem(LS_COLOR_SCHEME_KEY) as 'dark' | 'light' | null
}

export const removeSavedScheme = (): void => {
  localStorage.removeItem(LS_COLOR_SCHEME_KEY)
}
