import React, { useContext, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Player } from '@lottiefiles/react-lottie-player'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import FacebookIcon from '@mui/icons-material/Facebook'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import {
  AlertProps,
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  Paper,
  Snackbar,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import MuiAlert from '@mui/material/Alert'
import axios from 'axios'

import LottieLogin from '../../assets/lottie-login.json'
import { Input } from '../../components/shared/form/Input'
import { AuthContext } from '../../contexts/AuthContext'

interface IFormInput {
  email: string
  password: string
}

function Login(): React.ReactElement {
  const { login } = useContext(AuthContext);
  const { control, handleSubmit } = useForm<IFormInput>()
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('md'))
  const [showPassword, setShowPassword] = useState(false)
  const [open, setOpen] = useState(false)

  const handleCloseAlert = (event: React.SyntheticEvent | Event, reason?: string): void => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    await login(data)
  }

  const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
  })

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          height: '100vh',
          width: '100vw',
          background:
            'linear-gradient(90deg, rgb(255 255 255 / 0%) 0%, rgb(121 186 255 / 30%) 35%, rgb(75 134 245 / 47%) 96%)',
        }}
      >
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
            }}
          >
            <Paper sx={{ padding: 2, width: matches ? '60%' : '95%' }}>
              <Typography variant='h5'> Bem vindo!(a) </Typography>
              <Typography> Acesse sua conta! </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', marginTop: 4 }}>
                <Button
                  variant='contained'
                  sx={{
                    width: matches ? '50%' : '70%',
                    alignSelf: 'center',
                    marginBottom: 1,
                    borderRadius: 20,
                  }}
                  startIcon={<FacebookIcon />}
                >
                  Logar com facebook
                </Button>
                <Button
                  variant='contained'
                  sx={{
                    width: matches ? '50%' : '70%',
                    alignSelf: 'center',
                    marginBottom: 4,
                    borderRadius: 20,
                  }}
                  startIcon={<LinkedInIcon />}
                >
                  Logar com LinkedIn
                </Button>
                <Divider />
                <form onSubmit={handleSubmit(onSubmit)}>
                  <FormControl sx={{ marginTop: 4, width: '100%' }} variant='outlined'>
                    <InputLabel htmlFor='outlined-adornment-email'>Email</InputLabel>
                    <Input
                      id='outlined-adornment-email'
                      control={control}
                      name={'email'}
                      defaultValue={''}
                      fullWidth
                      required
                      label='Email'
                      size='small'
                    />
                  </FormControl>
                  <FormControl
                    sx={{ marginTop: 4, width: '100%', marginBottom: 4 }}
                    variant='outlined'
                  >
                    <InputLabel htmlFor='outlined-adornment-password'>Password</InputLabel>
                    <Input
                      fullWidth
                      required
                      size='small'
                      id='outlined-adornment-password'
                      type={showPassword ? 'text' : 'password'}
                      endAdornment={
                        <InputAdornment position='end'>
                          <IconButton
                            aria-label='toggle password visibility'
                            onClick={() => setShowPassword(!showPassword)}
                            edge='end'
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label='Password'
                      control={control}
                      name={'password'}
                      defaultValue={''}
                    />
                  </FormControl>
                  <Link> Esqueci minha senha.</Link>
                  <Button
                    type='submit'
                    variant='contained'
                    sx={{ marginTop: 4, marginBottom: 4, width: '100%' }}
                  >
                    Enviar
                  </Button>
                </form>
                <Typography>
                  Não é cadastrado? <Link>Cadastre-se aqui!</Link>
                </Typography>
              </Box>
            </Paper>
          </Grid>
          {matches && (
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Player
                autoplay
                loop
                src={LottieLogin}
                style={{ height: '300px', width: '300px', alignSelf: 'center' }}
              ></Player>
            </Grid>
          )}
        </Grid>
      </Box>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleCloseAlert}>
        <Alert onClose={handleCloseAlert} severity='error' sx={{ width: '100%' }}>
          Credeinciais incorretas, tente novamente
        </Alert>
      </Snackbar>
    </>
  )
}

export default Login

