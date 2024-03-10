import { RootState } from '@components/store'
import { SourcesType } from './types'

export const getSources = (state: RootState): SourcesType[] => state.sources
