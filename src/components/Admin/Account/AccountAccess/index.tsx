import React from 'react'
import { Box, Button,Typography } from '@mui/material'

export function AccountAccess(): React.ReactElement {
  return (
    <Box sx={{ m: 2 }}>
      <Typography variant='h4'>Redefinição de senha</Typography>
      <Typography>
        {' '}
        Para redefinir sua senha clique em Enviar Email, lhe enviaremos um email com as onstruções
        de acesso!
      </Typography>
      <p>
        <b>Email:</b> user@mail.com
      </p>
      <Button variant='contained' sx={{ marginTop: 2 }}>Enviar Email</Button>
    </Box>
  )
}
