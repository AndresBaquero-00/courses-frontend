import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Paper, TextField, Typography } from '@mui/material';

import { AuthContext } from '../../context';

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(email).then((logged) => {
      if (logged) {
        navigate('/', { replace: true });
      }
    });
  };

  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        '&::before': {
          position: 'absolute',
          content: '""',
          zIndex: '2',
          backgroundImage:
            'url("https://images.unsplash.com/photo-1660858149072-de876d8603cc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          inset: 0,
          margin: 'auto',
          filter: 'brightness(70%)',
        },
      }}
    >
      <Paper
        sx={{
          padding: '1rem',
          width: '80%',
          maxWidth: '400px',
          position: 'fixed',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(3px)',
          zIndex: 3,
        }}
      >
        <Typography
          variant="h1"
          sx={{
            textAlign: 'center',
            fontSize: '1.4rem',
            fontWeight: 600,
            color: 'white',
          }}
        >
          Iniciar sesión
        </Typography>
        <form
          onSubmit={onLogin}
          style={{
            marginTop: '2rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          <TextField
            value={email}
            onChange={onChangeInput}
            name="email"
            type="email"
            label="Correo electrónico"
            variant="filled"
            sx={{ backgroundColor: 'rgba(255, 255, 255, 0.7)' }}
          />
          <Button variant="contained" type="submit">
            Ingresar
          </Button>
        </form>
      </Paper>
    </Box>
  );
};
