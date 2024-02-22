import { applyColorSceme, getSystemColorScheme, getSavedScheme } from './colorSchemeUtils'

applyColorSceme(getSavedScheme() || getSystemColorScheme())
