import React from 'react'
import { Navigate, RouteProps, useLocation } from 'react-router-dom'
// import { useAuthContext } from '../../AuthContextProvider'
import { Box, CircularProgress } from '@mui/material'
import { useAuthContext } from '../../AuthContextProvider'

type PrivateRoutesType = {
  children?: React.ReactNode
} & RouteProps

export const RequireAuth: React.FC<PrivateRoutesType> = ({ children }) => {
  const { isAuth } = useAuthContext()
  const location = useLocation()

  if (isAuth === null) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <CircularProgress color="primary" />
      </Box>
    )
  }

  return (
    <React.Fragment>
      {!isAuth ? <Navigate to={'/login'} replace state={{ from: location.state }} /> : children}
    </React.Fragment>
  )
}
