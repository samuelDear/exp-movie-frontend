import { useState } from 'react';
import { styled } from '@mui/system';
import { Box, Typography, Button, Grid } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

import { HeaderLogin, Layout, InputForm, InputPassword } from 'components';
import { registerStyles } from 'styles';
import { MD5, API } from 'config';

const Register = () => {
  // state
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);

  // Styles
  const styles = registerStyles;
  const LoginBox = styled(Box)(({ theme }) => ({
    ...styles.loginBox(theme),
    ...styles.registerBox(theme),
  }));
  const RegisterBtn = styled(Button)({
    ...styles.loginButton,
    ...styles.registerregisterBtn,
  });
  const ButtonLogin = styled(Button)(styles.loginButton);

  // Otros
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { control, handleSubmit, setError } = useForm({
    email: '',
    name: '',
    confirmPassword: '',
    password: '',
  });

  const register = async values => {
    try {
      // Armamos los parametros
      const params = {
        usr: values.email,
        name: values.name,
        pwd: MD5(values.password),
      };

      setLoading(true);

      // Hacemos login
      await API.register(params);

      enqueueSnackbar('Usuario registrado correctamente', {
        variant: 'success',
      });

      // Volvemos al inicio
      navigate('/login');

      setLoading(false);
    } catch (e) {
      const { status, data } = e;

      switch (status) {
        case 400:
          enqueueSnackbar(data.msg, {
            variant: 'error',
          });
          break;
        case 405:
          setError('email', {
            type: 'custom',
            message: 'Formato de correo incorrecto',
          });
          break;
        case 500:
          enqueueSnackbar('Error Interno', {
            variant: 'error',
          });
          break;
        default:
          enqueueSnackbar('Error Interno', {
            variant: 'error',
          });
      }

      setLoading(false);
    }
  };

  return (
    <Layout isLoading={loading}>
      <HeaderLogin />
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={styles.mainBox}>
        <LoginBox>
          <Typography variant="h4" body="h1" sx={styles.titleLogin}>
            Registro de usuario
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <InputForm
                name="email"
                label="Correo:"
                className={styles.inputForm}
                control={control}
                validations={{
                  required: 'Campo requerido',
                  validate: {
                    email: value =>
                      (value && /\S+@\S+\.\S+/.test(value)) ||
                      'Correo inválido',
                  },
                }}
                fullWidth
                placeholder="Correo"
                inputProps={{
                  maxLength: 128,
                  inputMode: 'email',
                }}
                variant="filled"
                replace={val => val.replace(/\s/g, '')}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <InputForm
                name="name"
                label="Nombre de usuario"
                className={styles.inputForm}
                control={control}
                validations={{
                  required: 'Campo requerido',
                }}
                fullWidth
                placeholder="Nombre de usuario"
                inputProps={{
                  maxLength: 64,
                }}
                variant="filled"
                replace={val => val.replace(/\s/g, '')}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <InputPassword
                name="password"
                label="Contraseña:"
                placeholder="Contraseña"
                showPwd={showPwd}
                setShowPwd={() => setShowPwd(prevState => !prevState)}
                control={control}
                classes={styles.inputForm}
                fullWidth
                validations={{
                  required: 'Campo requerido',
                  validate: {
                    noSpaces: value =>
                      (value && /^\S*$/.test(value)) || 'Contraseña inválida',
                  },
                }}
                variant="filled"
                replace={val => val.replace(/\s/g, '')}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <InputPassword
                name="confirmPassword"
                label="Confirmar Contraseña:"
                placeholder="Confirmar Contraseña"
                showPwd={showPwd}
                setShowPwd={() => setShowPwd(prevState => !prevState)}
                control={control}
                classes={styles.inputForm}
                fullWidth
                validations={{
                  required: 'Campo requerido',
                  validate: {
                    noSpaces: value =>
                      (value && /^\S*$/.test(value)) || 'Contraseña inválida',
                  },
                }}
                variant="filled"
                replace={val => val.replace(/\s/g, '')}
              />
            </Grid>
          </Grid>

          <RegisterBtn variant="primary" onClick={handleSubmit(register)}>
            Registrarse
          </RegisterBtn>
          <ButtonLogin variant="secondary" onClick={() => navigate('/login')}>
            Volver
          </ButtonLogin>
        </LoginBox>
      </Box>
    </Layout>
  );
};

export default Register;
