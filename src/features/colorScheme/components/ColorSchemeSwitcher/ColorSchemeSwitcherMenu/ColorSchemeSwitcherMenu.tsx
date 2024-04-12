import { AutoScheme } from '@components/Icons/AutoScheme'
import { DarkScheme } from '@components/Icons/DarkScheme'
import { LightScheme } from '@components/Icons/LightScheme'
import classNames from 'classnames'
import React, { FC } from 'react'
import { ColorSchemeSwitcherValues } from '../../../types'
import './ColorSchemeSwitcherMenu.css'

interface Props {
  selectedScheme: ColorSchemeSwitcherValues
  onChangeScheme: (value: ColorSchemeSwitcherValues) => any
  className?: string
}

export const ColorSchemeSwitcherMenu: FC<Props> = ({ selectedScheme, onChangeScheme, className }) => {
  return (
    <div className={classNames('color-scheme-switcher-menu', className)}>
      <button className="color-scheme-switcher-menu__option" onClick={() => onChangeScheme('auto')}>
        <AutoScheme />
        <span className="color-scheme-switcher-menu__text">Авто</span>
        {selectedScheme === 'auto' && (
          <img
            className="color-scheme-switcher-menu__check"
            src={require('../../../../../images/mark.svg')}
            alt="Выбранная тема"
          />
        )}
      </button>
      <button className="color-scheme-switcher-menu__option" onClick={() => onChangeScheme('light')}>
        <LightScheme />
        <span className="color-scheme-switcher-menu__text">Светлая</span>
        {selectedScheme === 'light' && (
          <img
            className="color-scheme-switcher-menu__check"
            src={require('../../../../../images/mark.svg')}
            alt="Выбранная тема"
          />
        )}
      </button>
      <button className="color-scheme-switcher-menu__option" onClick={() => onChangeScheme('dark')}>
        <DarkScheme />
        <span className="color-scheme-switcher-menu__text">Темная</span>
        {selectedScheme === 'dark' && (
          <img
            className="color-scheme-switcher-menu__check"
            src={require('../../../../../images/mark.svg')}
            alt="Выбранная тема"
          />
        )}
      </button>
    </div>
  )
}
