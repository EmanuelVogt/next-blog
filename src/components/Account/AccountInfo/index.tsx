import React from 'react'
import { Box, Button, Grid, TextField } from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import dayjs, { Dayjs } from 'dayjs'

export function AccountInfo(): React.ReactElement {
  const [bornDate, setBornDate] = React.useState<Dayjs | null>(dayjs())

  return (
    <Box
      component='form'
      sx={{
        padding: 2,
        '& .MuiTextField-root': { m: 1 },
      }}
      noValidate
      autoComplete='off'
    >
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField fullWidth required id='outlined-required' label='Nome' size='small' />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              disableFuture
              label='Data de nascimento'
              openTo='year'
              views={['year', 'month', 'day']}
              value={bornDate}
              onChange={(value) => {
                setBornDate(value)
              }}
              renderInput={(params) => <TextField fullWidth size='small' {...params} />}
            />
          </LocalizationProvider>
          <TextField fullWidth label='Estado Civil' size='small' />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField fullWidth required id='outlined-required' label='Email' size='small' />
          <TextField fullWidth label='Sexo' size='small' />
          <TextField fullWidth label='Cep' size='small' />
        </Grid>
      </Grid>
      <Button variant='contained' sx={{ marginTop: 2 }}>Salvar</Button>
    </Box>
  )
}
