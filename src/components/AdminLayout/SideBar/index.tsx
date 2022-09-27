import { useState } from 'react'
import HomeOutlinedIcon from '@mui/icons-material/Home'
import InboxIcon from '@mui/icons-material/Inbox'
import ListIcon from '@mui/icons-material/List'
import { Box, CSSObject, styled, Theme, Toolbar } from '@mui/material'
import MuiDrawer from '@mui/material/Drawer'

import { NavItem } from '../NavItem'

type Props = {
  isCollapsed: boolean
  children: JSX.Element
}

const drawerWidth = 300

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
})

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
})

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...((open ?? false) && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!(open ?? false) && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
)

export type StyleProps = {
  color: string
  collapsed?: boolean
}

const menuItems = [
  {
    title: 'Home',
    to: '/admin/home',
    icon: <HomeOutlinedIcon />,
  },
  {
    title: 'Posts',
    to: '/admin/posts',
    icon: <InboxIcon />,
  },
  {
    title: 'Contacts',
    to: '/admin/contacts',
    icon: <ListIcon />,
  },
]

export function SideBar({ isCollapsed, children }: Props): JSX.Element {
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleDrawerToggle = (): void => {
    setMobileOpen(!mobileOpen)
  }

  return (
    <>
      <Drawer
        variant={'permanent'}
        sx={{
          width: isCollapsed ? 60 : drawerWidth,
          '& .MuiDrawer-paper': { boxSizing: 'border-box' },
        }}
        open={!isCollapsed}
        onClose={handleDrawerToggle}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto', height: '100vh' }}>
          {menuItems.map(({ icon, title, to }) => (
            <NavItem icon={icon} isCollapsed={isCollapsed} title={title} to={to} key={title} />
          ))}
        </Box>
      </Drawer>
      <Box sx={{ width: '100vw', height: '100vh', padding: 2 }}>
        <Toolbar />
        {children}
      </Box>
    </>
  )
}
