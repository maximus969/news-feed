import React, { ForwardedRef, forwardRef } from 'react'
import './ColorSchemeSwitcherButton.css'
import { AutoScheme } from '@components/Icons/AutoScheme'
import { DarkScheme } from '@components/Icons/DarkScheme'
import { LightScheme } from '@components/Icons/LightScheme'
import { ColorSchemeSwitcherValues } from '../../../types'
import { useTranslation } from 'react-i18next'

interface Props {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => any
  scheme: ColorSchemeSwitcherValues
}

export const ColorSchemeSwitcherButton = forwardRef(function ColorSchemeSwitcherButton(
  { onClick, scheme }: Props,
  ref: ForwardedRef<HTMLButtonElement>
) {
  const { t } = useTranslation()
  return (
    <button
      aria-label={t(`color_scheme_button_change`)}
      className="color-scheme-switcher-button"
      ref={ref}
      onClick={onClick}
    >
      {scheme === 'auto' && <AutoScheme />}
      {scheme === 'dark' && <DarkScheme />}
      {scheme === 'light' && <LightScheme />}
    </button>
  )
})
