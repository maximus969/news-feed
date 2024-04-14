import React from 'react'
import './LocaleSwitcherMenu.css'
import { Locale } from '@features/locale/types'
import classNames from 'classnames'

interface LocaleSwitcherMenuType {
  selectedLocale: Locale
  onChangeLocale: (value: Locale) => any
  className?: string
}

export const LocaleSwitcherMenu: React.FC<LocaleSwitcherMenuType> = ({ selectedLocale, onChangeLocale, className }) => {
  return (
    <div className={classNames('locale-switcher-menu', className)}>
      <button className="locale-switcher-menu__option" onClick={() => onChangeLocale(Locale.en)}>
        <span className="locale-switcher-menu__text">English</span>
        {selectedLocale === Locale.en && (
          <img
            className="locale-switcher-menu__check"
            src={require('../../../../images/mark.svg')}
            alt="Выбранная тема"
          />
        )}
      </button>

      <button className="locale-switcher-menu__option" onClick={() => onChangeLocale(Locale.ru)}>
        <span className="locale-switcher-menu__text">Русский</span>
        {selectedLocale === Locale.ru && (
          <img
            className="locale-switcher-menu__check"
            src={require('../../../../images/mark.svg')}
            alt="Выбранная тема"
          />
        )}
      </button>
    </div>
  )
}
