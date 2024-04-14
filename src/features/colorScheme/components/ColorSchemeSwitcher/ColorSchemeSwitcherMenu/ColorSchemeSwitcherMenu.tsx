import { AutoScheme } from '@components/Icons/AutoScheme'
import { DarkScheme } from '@components/Icons/DarkScheme'
import { LightScheme } from '@components/Icons/LightScheme'
import classNames from 'classnames'
import React, { FC } from 'react'
import { ColorSchemeSwitcherValues } from '../../../types'
import './ColorSchemeSwitcherMenu.css'
import { useTranslation } from 'react-i18next'

interface Props {
  selectedScheme: ColorSchemeSwitcherValues
  onChangeScheme: (value: ColorSchemeSwitcherValues) => any
  className?: string
}

export const ColorSchemeSwitcherMenu: FC<Props> = ({ selectedScheme, onChangeScheme, className }) => {
  const { t } = useTranslation()
  return (
    <div className={classNames('color-scheme-switcher-menu', className)} role="listbox">
      <button role="option" className="color-scheme-switcher-menu__option" onClick={() => onChangeScheme('auto')}>
        <AutoScheme />
        <span className="color-scheme-switcher-menu__text">{t(`color_scheme_auto`)}</span>
        {selectedScheme === 'auto' && (
          <img
            className="color-scheme-switcher-menu__check"
            src={require('../../../../../images/mark.svg')}
            alt={t(`color_scheme_selected`)}
          />
        )}
      </button>
      <button role="option" className="color-scheme-switcher-menu__option" onClick={() => onChangeScheme('light')}>
        <LightScheme />
        <span className="color-scheme-switcher-menu__text">{t(`color_scheme_light`)}</span>
        {selectedScheme === 'light' && (
          <img
            className="color-scheme-switcher-menu__check"
            src={require('../../../../../images/mark.svg')}
            alt={t(`color_scheme_selected`)}
          />
        )}
      </button>
      <button role="option" className="color-scheme-switcher-menu__option" onClick={() => onChangeScheme('dark')}>
        <DarkScheme />
        <span className="color-scheme-switcher-menu__text">{t(`color_scheme_dark`)}</span>
        {selectedScheme === 'dark' && (
          <img
            className="color-scheme-switcher-menu__check"
            src={require('../../../../../images/mark.svg')}
            alt={t(`color_scheme_selected`)}
          />
        )}
      </button>
    </div>
  )
}
