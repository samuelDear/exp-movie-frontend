import { useState } from 'react';
import { styled } from '@mui/system';
import { Box, Typography, Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { HeaderLogin, Layout, InputForm, InputPassword } from 'components';
import { loginStyles } from 'styles';

const Login = () => {
  // state
  const [showPwd, setShowPwd] = useState(false);

  // Styles
  const styles = loginStyles;
  const LoginBox = styled(Box)(({ theme }) => styles.loginBox(theme));
  const ButtonLogin = styled(Button)(styles.loginButton);
  const LinkForgott = styled(Link)(styles.forgotPwd);

  // Otros
  const { control } = useForm({ email: '', password: '' });

  return (
    <Layout>
      <HeaderLogin />
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={styles.mainBox}>
        <LoginBox>
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
            className={styles.inputForm}
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

          <ButtonLogin variant="primary">Iniciar sesión</ButtonLogin>
          <ButtonLogin variant="secondary">Registrarse</ButtonLogin>

          <LinkForgott to="/">Olvide mi contraseña</LinkForgott>
        </LoginBox>
      </Box>
    </Layout>
  );
};

export default Login;
