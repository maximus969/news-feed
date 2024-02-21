import React, { Reducer, useReducer, useState } from 'react'
import './LoginContainer.css'
import { LoginField, LoginForm } from '@components/LoginForm/LoginForm'
import { validateEmail } from './utils'
import { ALLOWED_OAUTH_PROVIDERS, useAuthContext } from '../AuthContextProvider'
import { Link, Typography } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'
import GoogleIcon from '@mui/icons-material/Google'
import LoginIcon from '@mui/icons-material/Login'
import { ProviderId, UserCredential } from 'firebase/auth'
import GitHubIcon from '@mui/icons-material/GitHub'

type LoginStateType = Omit<LoginField, 'onFieldChange'>

type LoginActionType = {
  type: 'onFieldChange' | 'error'
  value: string
}

const getOauthProviderIcon = (provider: string) => {
  switch (provider) {
    case ProviderId.GOOGLE:
      return <GoogleIcon fontSize="inherit" />
    case ProviderId.GITHUB:
      return <GitHubIcon fontSize="inherit" />
    default:
      return <LoginIcon fontSize="inherit" />
  }
}

const reducer = (state: LoginStateType, action: LoginActionType): LoginStateType => {
  switch (action.type) {
    case 'onFieldChange':
      return {
        ...state,
        error: false,
        helperText: '',
        value: action.value,
      }
    case 'error':
      return {
        ...state,
        error: true,
        helperText: action.value,
      }
    default:
      throw new Error()
  }
}

export const LoginContainer: React.FC = () => {
  const [emailState, dispatchEmail] = useReducer<Reducer<LoginStateType, LoginActionType>>(reducer, {
    name: 'email',
    value: '',
  })
  const [passwordState, dispatchPassword] = useReducer<Reducer<LoginStateType, LoginActionType>>(reducer, {
    name: 'password',
    value: '',
  })
  const navigateState = useNavigate()
  const location = useLocation()
  const [authError, setAuthError] = useState('')
  const { loginWithEmailAndPassword, loginWithOauthPopup } = useAuthContext()

  const proccessLogin = (promise: Promise<UserCredential>): void => {
    promise
      .then(() => {
        navigateState(location?.state?.from || '/admin')
      })
      .catch((err) => {
        setAuthError(err.message || 'error')
      })
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    let isValid = true
    if (!validateEmail(emailState.value)) {
      dispatchEmail({
        type: 'error',
        value: 'Введите корректный email',
      })
      isValid = false
    }

    if (passwordState?.value?.length <= 6) {
      dispatchPassword({
        type: 'error',
        value: 'Длина пароля должна быть больше 6 символов',
      })
      isValid = false
    }

    if (isValid) {
      proccessLogin(loginWithEmailAndPassword(emailState?.value, passwordState?.value))
    }
  }

  const onOauthClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()

    const dataset = e.currentTarget.closest('a')?.dataset
    if (dataset?.provider) {
      proccessLogin(loginWithOauthPopup(dataset?.provider))
    }
  }

  return (
    <div className="login-container">
      {authError && (
        <Typography variant="subtitle2" color={'InfoText'}>
          {authError}
        </Typography>
      )}
      <LoginForm
        email={{
          ...emailState,
          onFieldChange: (e) => {
            dispatchEmail({ type: 'onFieldChange', value: e.currentTarget.value })
          },
        }}
        password={{
          ...passwordState,
          onFieldChange: (e) => {
            dispatchPassword({ type: 'onFieldChange', value: e.currentTarget.value })
          },
        }}
        className=""
        onFormSubmit={onSubmit}
      />
      <div className="oauth-container">
        {Object.keys(ALLOWED_OAUTH_PROVIDERS).map((key: string) => {
          return (
            <Link key={key} onClick={onOauthClick} href={'#'} className="oauth-container-item" data-provider={key}>
              {getOauthProviderIcon(key)}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
