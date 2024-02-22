import React, { ButtonHTMLAttributes } from 'react'
import loader from '../../assets/loader.svg'
import './Button.css'

interface ButtonType extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean
}

export const Button: React.FC<ButtonType> = ({ children, loading = true, onClick, ...rest }) => {
  return (
    <button className="button" {...rest} onClick={loading ? undefined : onClick}>
      {children}
      {loading && (
        <span className="button__loading">
          <img src={loader} alt="Загрузка кнопки" className="button__spinner" />
        </span>
      )}
    </button>
  )
}
