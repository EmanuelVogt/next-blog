import * as React from 'react'
import { CircleNotifications } from '@mui/icons-material'
import MenuIcon from '@mui/icons-material/Menu'
import { Avatar, Box, IconButton, Toolbar } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import { deepOrange } from '@mui/material/colors'

import { MenuAvatar } from '../MenuAvatar'

import { EmptyDiv, Image } from './styles'

type Props = {
  handleCollapseSideBar: () => void
}

export const Header = ({ handleCollapseSideBar }: Props): JSX.Element => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = (): void => {
    setAnchorEl(null)
  }

  return (
    <>
      <AppBar
        position='fixed'
        color='inherit'
        sx={{
          display: 'flex',
          boxShadow: 'none',
          borderBottom: '1px solid',
          borderBottomColor: 'rgba(0, 0, 0, 0.12)',
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={handleCollapseSideBar}
            edge='start'
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ width: '100%'}}/>
          <EmptyDiv />
          <IconButton color='primary' aria-label='upload picture' component='label'>
            <CircleNotifications />
          </IconButton>
          <IconButton onClick={handleClick}>
            <Avatar sx={{ bgcolor: deepOrange[500] }}>N</Avatar>
          </IconButton>
        </Toolbar>
      </AppBar>
      <MenuAvatar anchorEl={anchorEl} open={open} handleClose={handleClose} />
    </>
  )
}
