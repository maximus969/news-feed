import React, { HTMLAttributes, RefObject, useEffect, useState, useRef } from 'react'
import './Dropdown.css'
import throttle from 'lodash.throttle'
import { createPortal } from 'react-dom'
import classNames from 'classnames'
import { CSSTransition } from 'react-transition-group'
import { createFocusTrap } from 'focus-trap'

interface DropdownType extends HTMLAttributes<HTMLElement> {
  targetRef: RefObject<HTMLElement>
  shown: boolean
  onShownChange: (shown: boolean) => void
}

const calcCoodrinates = (targetElement: HTMLElement) => {
  const rect = targetElement.getBoundingClientRect()
  return {
    top: window.scrollY + rect.bottom + 12,
    right: window.innerWidth - rect.right - window.scrollX,
  }
}

export const Dropdown: React.FC<DropdownType> = ({
  targetRef,
  shown,
  onShownChange,
  children,
  className,
  style,
  ...rest
}) => {
  const [coords, setCoords] = useState({ top: 0, right: 0 })
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const focusTrap = createFocusTrap(ref.current as HTMLDivElement, { allowOutsideClick: true })

    if (shown) {
      focusTrap.activate()
      setCoords(calcCoodrinates(targetRef.current as HTMLElement))
    }

    return () => {
      focusTrap.deactivate()
    }
  }, [shown])

  useEffect(() => {
    onShownChange(shown)
  }, [shown, onShownChange])

  useEffect(() => {
    const documentClickListener = () => {
      onShownChange(false)
    }
    const windowResizeListener = throttle(() => {
      setCoords(calcCoodrinates(targetRef.current as HTMLElement))
    }, 100)

    if (shown) {
      document.addEventListener('click', documentClickListener)
      window.addEventListener('resize', windowResizeListener)
    }

    return () => {
      document.removeEventListener('click', documentClickListener)
      window.removeEventListener('resize', windowResizeListener)
    }
  }, [shown, onShownChange])

  return createPortal(
    <CSSTransition in={shown} classNames={'dropdown-animation'} mountOnEnter={true} unmountOnExit={true} timeout={200}>
      <div ref={ref} className={classNames('dropdown', className)} style={{ ...style, ...coords }} {...rest}>
        {children}
      </div>
    </CSSTransition>,
    document.getElementById('overlay') as HTMLElement
  )
}
