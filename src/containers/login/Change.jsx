import { useState } from 'react';
import { styled } from '@mui/system';
import { Box, Typography, Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

import { HeaderLogin, Layout, InputPassword } from 'components';
import { changeStyles } from 'styles';
import { MD5, API } from 'config';

const Change = () => {
  // state
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);

  // Styles
  const styles = changeStyles;
  const LoginBox = styled(Box)(({ theme }) => styles.loginBox(theme));
  const ButtonLogin = styled(Button)(styles.loginButton);

  // Otros
  const [searchParams] = useSearchParams();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { control, handleSubmit } = useForm({
    confirmPassword: '',
    password: '',
  });

  const change = async values => {
    try {
      if (values.password !== values.confirmPassword) {
        enqueueSnackbar('Contraseñas no coinciden', {
          variant: 'error',
        });

        return;
      }
      // Armamos los parametros
      const params = {
        hash: searchParams.get('hash'),
        pwd: MD5(values.password),
      };

      setLoading(true);

      // Cambiamos
      await API.change(params);

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
        case 401:
          enqueueSnackbar('Hash incorrecto, intente nuevamente el proceso', {
            variant: 'error',
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
            Cambiar contraseña
          </Typography>

          <Typography variant="p2" body="p" sx={styles.messageLogin}>
            Cambio de contraseña para el usuario {searchParams.get('email')}
          </Typography>

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

          <InputPassword
            name="confirmPassword"
            label="Confirmar Contraseña:"
            placeholder="ConfirmarContraseña"
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

          <ButtonLogin variant="primary" onClick={handleSubmit(change)}>
            Cambiar
          </ButtonLogin>
          <ButtonLogin variant="secondary" onClick={() => navigate('/login')}>
            Volver
          </ButtonLogin>
        </LoginBox>
      </Box>
    </Layout>
  );
};

export default Change;
