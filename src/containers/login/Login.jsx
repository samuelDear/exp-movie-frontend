import { useState } from 'react';
import { styled } from '@mui/system';
import { Box, Typography, Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

import { HeaderLogin, Layout, InputForm, InputPassword } from 'components';
import { loginStyles } from 'styles';
import { MD5, API } from 'config';

const Login = () => {
  // state
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);

  // Styles
  const styles = loginStyles;
  const LoginBox = styled('form')(({ theme }) => styles.loginBox(theme));
  const ButtonLogin = styled(Button)(styles.loginButton);
  const LinkForgott = styled(Link)(styles.forgotPwd);

  // Otros
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { control, handleSubmit, setError } = useForm({
    email: '',
    password: '',
  });

  const login = async values => {
    try {
      // Armamos los parametros
      const params = {
        usr: values.email,
        pwd: MD5(values.password),
      };

      setLoading(true);

      // Hacemos login
      const response = await API.login(params);

      // Si todo esta bien guardamos los datos
      localStorage.setItem('user', JSON.stringify(response));
      localStorage.setItem('sessionid', response.sessionid);

      // Volvemos al inicio
      navigate('/');

      setLoading(false);
    } catch (e) {
      const { status, data } = e;

      switch (status) {
        case 400:
          enqueueSnackbar(data.msg, {
            variant: 'error',
          });
          break;
        case 403:
          enqueueSnackbar('Datos incorrectos o usuario no existe', {
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
        <LoginBox onSubmit={handleSubmit(login)}>
          <Typography variant="h4" body="h1" sx={styles.titleLogin}>
            Movie Login
          </Typography>

          <InputForm
            name="email"
            label="Correo:"
            className={styles.inputForm}
            control={control}
            validations={{
              required: 'Campo requerido',
              validate: {
                email: value =>
                  (value && /\S+@\S+\.\S+/.test(value)) || 'Correo inválido',
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

          <ButtonLogin variant="primary" type="submit">
            Iniciar sesión
          </ButtonLogin>
          <ButtonLogin
            variant="secondary"
            onClick={() => navigate('/register')}>
            Registrarse
          </ButtonLogin>

          <LinkForgott to="/forgot">Olvide mi contraseña</LinkForgott>
        </LoginBox>
      </Box>
    </Layout>
  );
};

export default Login;
