export const applyColorScheme = (scheme: 'light' | 'dark', persist = false): void => {
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', scheme === 'dark' ? '#262a2f' : 'fff')

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
