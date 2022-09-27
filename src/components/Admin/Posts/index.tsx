import { Box, Card, CardHeader, styled, Tab, Tabs } from "@mui/material"
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import React from "react"
import { PostsList } from "./PostsList"
import { NewPost } from "./NewPost"

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

export const AdminPosts = (): JSX.Element => {
  const [value, setValue] = React.useState(0)

  const handleChange = (_event: React.SyntheticEvent, newValue: number): void => {
    setValue(newValue)
  }
  return (
    <>
    <CardHeader title='Página de posts' />
    <Box sx={{ display: 'flex' }}>
      <Card sx={{ width: '100%', height: '100%' }}>
        <Tabs value={value} onChange={handleChange} aria-label='icon position tabs example'>
          <CurstomTabs icon={<FormatListBulletedIcon />} iconPosition='start' label='Listagem' />
          <CurstomTabs icon={<AddCircleOutlineIcon />} iconPosition='start' label='Criação' />
        </Tabs>
        {value === 0 && <PostsList />}
        {value === 1 && <NewPost />}
      </Card>
    </Box>
  </>
  )
}