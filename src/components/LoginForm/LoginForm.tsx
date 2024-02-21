import { Box, Button, Stack, TextField } from '@mui/material'
import React from 'react'

export type LoginField = {
  name: string
  value: string
  onFieldChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  error?: boolean
  helperText?: string
}

type LoginType = {
  email: LoginField
  password: LoginField
  onFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  className?: string
}

export const LoginForm: React.FC<LoginType> = ({ email, password, onFormSubmit, className }) => {
  return (
    <Box className={className}>
      <form method="POST" onSubmit={onFormSubmit}>
        <Stack direction={'column'} spacing={1}>
          <TextField
            fullWidth
            label={email.name}
            variant="outlined"
            name={email.name}
            value={email.value}
            onChange={email.onFieldChange}
            error={!!email.error}
            helperText={email.helperText}
          />

          <TextField
            fullWidth
            label={password.name}
            variant="outlined"
            name={password.name}
            value={password.value}
            onChange={password.onFieldChange}
            error={!!password.error}
            helperText={password.helperText}
          />
          <Button size="large" type="submit" color="primary" variant="contained">
            Войти
          </Button>
        </Stack>
      </form>
    </Box>
  )
}
