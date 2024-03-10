import React from 'react'
import './AdminPanel.css'

import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import AppBar from '@mui/material/AppBar'
import CssBaseline from '@mui/material/CssBaseline'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import Typography from '@mui/material/Typography'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'

import ArticleIcon from '@mui/icons-material/Article'
import { Link, useNavigate } from 'react-router-dom'
import { IconButton } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout'
import { useAuthContext } from '../../Auth/AuthContextProvider'
// import { useAuthContext } from '../../auth/AuthContextProvider'

const drawerWidth = 300

export const AdminPanel: React.FC = ({ children }) => {
  const { logout } = useAuthContext()
  const navigate = useNavigate()
  const onLogoutClick = () => {
    logout()
    navigate('/login')
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Admin panel
          </Typography>

          <IconButton color={'inherit'} onClick={onLogoutClick}>
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            <ListItem>
              <ListItemButton component={Link} to="/admin">
                <ListItemIcon>
                  <ArticleIcon />
                </ListItemIcon>
                <ListItemText primary={'Партнерские материалы'} />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />

        {children}
      </Box>
    </Box>
  )
}
