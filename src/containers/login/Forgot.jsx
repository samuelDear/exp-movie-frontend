import { useState } from 'react';
import { styled } from '@mui/system';
import { Box, Typography, Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

import { HeaderLogin, Layout, InputForm } from 'components';
import { forgotStyles } from 'styles';
import { API } from 'config';

// Styles
const styles = forgotStyles;
const LoginBox = styled(Box)(({ theme }) => styles.loginBox(theme));
const ButtonLogin = styled(Button)(styles.loginButton);
const ButtonAccept = styled(Button)({
  ...styles.loginButton,
  ...styles.acceptBtn,
});

const Forgot = () => {
  // state
  const [loading, setLoading] = useState(false);

  // Otros
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { control, handleSubmit, setError } = useForm({
    email: '',
  });

  const forgot = async values => {
    try {
      // Armamos los parametros
      const params = {
        usr: values.email,
      };

      setLoading(true);

      // Hacemos login
      await API.forgot(params);

      // mensaje de exito
      enqueueSnackbar(`Correo enviado a ${values.email}`, {
        variant: 'success',
      });

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
        case 402:
          enqueueSnackbar(`Usuario ${values.email} no existe`, {
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
            Recuperar contrase??a
          </Typography>

          <Typography variant="p2" body="p" sx={styles.messageLogin}>
            En caso de que haya olvidado su contrase??a, ingrese su correo y le
            llegara una notificacion con un enlace para cambiar la contrase??a
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
                  (value && /\S+@\S+\.\S+/.test(value)) || 'Correo inv??lido',
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

          <ButtonAccept variant="primary" onClick={handleSubmit(forgot)}>
            Aceptar
          </ButtonAccept>

          <ButtonLogin variant="secondary" onClick={() => navigate('/login')}>
            Volver
          </ButtonLogin>
        </LoginBox>
      </Box>
    </Layout>
  );
};

export default Forgot;
