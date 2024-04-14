import React, { ForwardedRef, forwardRef } from 'react'
import './LocaleSwitcherButton.css'
import { Locale } from '@features/locale/types'
import classNames from 'classnames'
import { Arrow } from '@components/Icons/Arrow'

interface LocaleSwitcherButtonType {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => any
  locale: Locale
  opened?: boolean
}

export const LocaleSwitcherButton = forwardRef(function LocaleSwitcherButton(
  { opened, locale, onClick }: LocaleSwitcherButtonType,
  ref: ForwardedRef<HTMLButtonElement>
) {
  return (
    <button
      className={classNames('locale-switcher-button', { 'locale-switcher-button--opened': opened })}
      ref={ref}
      onClick={onClick}
    >
      <span className="locale-switcher-button__text">
        {locale === 'en' && 'ENG'}
        {locale === 'ru' && 'RU'}
      </span>
      <span className="locale-switcher-button__icon">
        <Arrow />
      </span>
    </button>
  )
})
