import { applyColorScheme, getSystemColorScheme, getSavedScheme } from './colorSchemeUtils'

applyColorScheme(getSavedScheme() || getSystemColorScheme())
