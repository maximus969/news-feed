import React, { FC, useEffect, useState, useRef } from 'react'
import { Burger } from '@components/Icons/Burger'
import { Cross } from '@components/Icons/Cross'
import { Logo } from '@components/Logo/Logo'
import { Navigation } from '@components/Navigation/Navigation'
import classNames from 'classnames'
import { ColorSchemeSwitcherMobile } from '@features/colorScheme/components/ColorSchemeSwitcher/ColorSchemeSwitcherMobile/ColorSchemeSwitcherMobile'
import { CSSTransition } from 'react-transition-group'
import { createFocusTrap } from 'focus-trap'

export const MobileHeader: FC = () => {
  const [isOpenMenu, toggleMenu] = useState(false)
  const [isOpenSubMenu, toggleSubMenu] = useState(false)
  const ref = useRef<HTMLElement | null>(null)

  const documentKeydownListener = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      toggleMenu(false)
    }
  }

  useEffect(() => {
    const focusTrap = createFocusTrap(ref.current as HTMLElement)

    if (isOpenMenu) {
      focusTrap.activate()
      document.documentElement.classList.add('--prevent-scroll')
    }

    return () => {
      focusTrap.deactivate()
      document.documentElement.classList.remove('--prevent-scroll')
    }
  }, [isOpenMenu])

  useEffect(() => {
    if (isOpenMenu) {
      document.addEventListener('keydown', documentKeydownListener)
    } else {
      document.removeEventListener('keydown', documentKeydownListener)
    }

    return () => {
      document.removeEventListener('keydown', documentKeydownListener)
    }
  }, [isOpenMenu])

  return (
    <header className="header" ref={ref}>
      <div className="container header__mobile-container">
        <Logo />
        <button
          aria-label={isOpenMenu ? 'Скрыть меню' : 'Открыть меню'}
          className="header__mobile-button"
          onClick={() => toggleMenu(!isOpenMenu)}
        >
          {isOpenMenu ? <Cross /> : <Burger />}
        </button>
      </div>
      <CSSTransition in={isOpenMenu} mountOnEnter unmountOnExit timeout={300} classNames="header-mobile-menu-animation">
        <div className="header__mobile-overlay">
          <div className='"header__mobile-backdrop"' />
          <div className="header__mobile-menu">
            {isOpenSubMenu ? (
              <button className="header__mobile-back-button" onClick={() => toggleSubMenu(false)}>
                К меню
              </button>
            ) : (
              <Navigation className="header__mobile-navigation" />
            )}

            <div
              className={classNames('header__mobile-controls', { 'header__mobile-controls--hasMenu': isOpenSubMenu })}
            >
              <ColorSchemeSwitcherMobile isMenuActive={isOpenSubMenu} onClickSchemeButton={() => toggleSubMenu(true)} />
            </div>
          </div>
        </div>
      </CSSTransition>
    </header>
  )
}
