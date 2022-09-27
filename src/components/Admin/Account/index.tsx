import React from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import LockIcon from '@mui/icons-material/Lock'
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera'
import { Box, Card, CardHeader, styled, Tab, Tabs } from '@mui/material'
import { AccountAccess } from './AccountAccess'
import { AccountInfo } from './AccountInfo'
import { AccountPhoto } from './AccountPhoto'

export const AdminAccount = (): JSX.Element => {
  const [value, setValue] = React.useState(0)

  const handleChange = (_event: React.SyntheticEvent, newValue: number): void => {
    setValue(newValue)
  }

  const CurstomTabs = styled(Tab)(({ theme }) => ({
    textTransform: 'none',
    minWidth: 0,
    minHeight: '45px',
    [theme.breakpoints.up('sm')]: {
      minWidth: 0,
    },
    fontWeight: theme.typography.fontWeightRegular,
    '&:hover': {
      color: theme.palette.primary.main,
      opacity: 1,
    },
    '&.Mui-selected': {
      color: theme.palette.primary.light,
      fontWeight: theme.typography.fontWeightMedium,
    },
    '&.Mui-focusVisible': {
      backgroundColor: '#d1eaff',
    },
  }))

  return (
    <>
      <CardHeader title='Configurações da conta' />
      <Box sx={{ display: 'flex' }}>
        <Card sx={{ width: '100%', height: '100%' }}>
          <Tabs value={value} onChange={handleChange} aria-label='icon position tabs example'>
            <CurstomTabs icon={<AccountCircleIcon />} iconPosition='start' label='Informações' />
            <CurstomTabs icon={<PhotoCameraIcon />} iconPosition='start' label='Foto' />
            <CurstomTabs icon={<LockIcon />} iconPosition='start' label='Acesso' />
          </Tabs>
          {value === 0 && <AccountInfo />}
          {value === 1 && <AccountPhoto />}
          {value === 2 && <AccountAccess />}
        </Card>
      </Box>
    </>
  )
}