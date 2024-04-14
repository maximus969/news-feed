import React from 'react'
import { useLocale } from '../../hooks'
import './LocaleSwitcherMobile.css'
import classNames from 'classnames'
import { LocaleSwitcherMenu } from '../LocaleSwitcherMenu/LocaleSwitcherMenu'
import { LocaleSwitcherButton } from '../LocaleSwitcherButton/LocaleSwitcherButton'

interface LocaleSwitcherMobileType {
  onClickLocaleButton: () => any
  onChangeLocale: () => any
  isMenuActive: boolean
}

export const LocaleSwitcherMobile: React.FC<LocaleSwitcherMobileType> = ({
  onClickLocaleButton,
  onChangeLocale,
  isMenuActive,
}) => {
  const { locale, setLocale } = useLocale()

  return (
    <div className={classNames('locale-switcher-mobile', { 'locale-switcher-mobile--opened': isMenuActive })}>
      {isMenuActive ? (
        <LocaleSwitcherMenu
          selectedLocale={locale}
          onChangeLocale={(locale) => {
            setLocale(locale)
            onChangeLocale()
          }}
        />
      ) : (
        <LocaleSwitcherButton onClick={onClickLocaleButton} locale={locale} />
      )}
    </div>
  )
}
