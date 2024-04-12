import React, { FC, HTMLAttributes, useEffect, useRef } from 'react'
import './ModalWrapper.css'
import { createPortal } from 'react-dom'
import classNames from 'classnames'
import { CSSTransition } from 'react-transition-group'
import { createFocusTrap } from 'focus-trap'

interface ModalWrapperType extends HTMLAttributes<HTMLElement> {
  alignX?: 'start' | 'center' | 'end'
  alignY?: 'start' | 'center' | 'end'
  onModalClose: () => void
  shown: boolean
}

export const MODAl_LABEL_ID = 'modal-label-id'
export const MODAl_DESCRIPTION_ID = 'modal-description-id'

export const ModalWrapper: FC<ModalWrapperType> = ({
  children,
  alignX = 'center',
  alignY = 'center',
  className,
  onModalClose,
  shown,
  ...rest
}: ModalWrapperType) => {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const focusTrap = createFocusTrap(ref.current as HTMLDivElement, { allowOutsideClick: true })
    if (shown) {
      focusTrap.activate()
      shown && document.documentElement.classList.add('--prevent-scroll')
    }

    return () => {
      focusTrap.deactivate()
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
        ref={ref}
        className={classNames(
          'modal-wrapper',
          `modal-wrapper--alignY-${alignY}`,
          `modal-wrapper--alignX-${alignX}`,
          className
        )}
        {...rest}
        onClick={onModalClose}
        role="dialog"
        aria-labelledby={MODAl_LABEL_ID}
        aria-describedby={MODAl_DESCRIPTION_ID}
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
