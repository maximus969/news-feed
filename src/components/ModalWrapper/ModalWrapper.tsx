import React, { FC, HTMLAttributes, useEffect } from 'react'
import './ModalWrapper.css'
import { createPortal } from 'react-dom'
import classNames from 'classnames'

interface ModalWrapperType extends HTMLAttributes<HTMLElement> {
  alignX?: 'start' | 'center' | 'end'
  alignY?: 'start' | 'center' | 'end'
  onModalClose: () => void
}

export const ModalWrapper: FC<ModalWrapperType> = ({
  children,
  alignX = 'center',
  alignY = 'center',
  className,
  onModalClose,
  ...rest
}: ModalWrapperType) => {
  useEffect(() => {
    document.documentElement.classList.add('--prevent-scroll')

    return () => {
      document.documentElement.classList.remove('--prevent-scroll')
    }
  }, [])

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
    </div>,
    document.getElementById('overlay') as HTMLElement
  )
}
