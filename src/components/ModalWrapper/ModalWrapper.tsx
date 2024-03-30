import React, { FC, HTMLAttributes, useEffect } from 'react'
import './ModalWrapper.css'
import { createPortal } from 'react-dom'
import classNames from 'classnames'
import { CSSTransition } from 'react-transition-group'

interface ModalWrapperType extends HTMLAttributes<HTMLElement> {
  alignX?: 'start' | 'center' | 'end'
  alignY?: 'start' | 'center' | 'end'
  onModalClose: () => void
  shown: boolean
}

export const ModalWrapper: FC<ModalWrapperType> = ({
  children,
  alignX = 'center',
  alignY = 'center',
  className,
  onModalClose,
  shown,
  ...rest
}: ModalWrapperType) => {
  useEffect(() => {
    if (shown) {
      shown && document.documentElement.classList.add('--prevent-scroll')
    }

    return () => {
      document.documentElement.classList.remove('--prevent-scroll')
    }
  }, [shown])

  useEffect(() => {
    const onKeyDownEventListener = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onModalClose()
      }
    }
    document.addEventListener('keydown', onKeyDownEventListener)

    return () => {
      document.removeEventListener('keydown', onKeyDownEventListener)
    }
  }, [onModalClose])

  return createPortal(
    <CSSTransition
      in={shown}
      mountOnEnter={true}
      unmountOnExit={true}
      timeout={300}
      classNames={'modal-wrapper-animation'}
    >
      <div
        className={classNames(
          'modal-wrapper',
          `modal-wrapper--alignY-${alignY}`,
          `modal-wrapper--alignX-${alignX}`,
          className
        )}
        {...rest}
        onClick={onModalClose}
      >
        <div
          className="modal-wrapper__children"
          onKeyDown={(e) => e.stopPropagation()}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </CSSTransition>,
    document.getElementById('overlay') as HTMLElement
  )
}
