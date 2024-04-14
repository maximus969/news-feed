import React, { ButtonHTMLAttributes } from 'react'
import loader from '../../images/loader.svg'
import './Button.css'
import { useTranslation } from 'react-i18next'

interface ButtonType extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean
}

export const Button: React.FC<ButtonType> = ({ children, loading = true, onClick, ...rest }) => {
  const { t } = useTranslation()
  return (
    <button className="button" {...rest} onClick={loading ? undefined : onClick}>
      {children}
      {loading && (
        <span className="button__loading">
          <img src={loader} alt={t(`button_spinner`)} className="button__spinner" />
        </span>
      )}
    </button>
  )
}
