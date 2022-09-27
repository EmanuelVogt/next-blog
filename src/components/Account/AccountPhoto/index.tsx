import React from 'react'
import { Avatar, Box, Button } from '@mui/material'

export function AccountPhoto(): React.ReactElement {
  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', m: 2 }}
    >
      <Button component='label'>
        <input hidden accept='image/*' type='file' />
        <Avatar
          alt='Remy Sharp'
          src='/static/images/avatar/1.jpg'
          sx={{ width: 200, height: 200 }}
        />
      </Button>
    </Box>
  )
}
