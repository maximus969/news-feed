import { RefObject } from 'react'

export type InputNameType = 'company-name' | 'articleTitle' | 'description' | 'text' | 'image'

export type InputError = {
  [key in InputNameType]: string
}

export type InputValues = {
  [key in InputNameType]: string
}

export type InputRefs = {
  [key in InputNameType]: RefObject<any>
}
