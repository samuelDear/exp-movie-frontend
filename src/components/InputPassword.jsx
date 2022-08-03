import { Controller } from 'react-hook-form';
import {
  FormControl,
  FormHelperText,
  InputAdornment,
  IconButton,
  TextField,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const InputPassword = ({
  name, // Nombre del input
  label, // Label del input
  showPwd, // Valor para mostrar o ocultar password
  setShowPwd, // Funcion para mostrar o ocultar password
  classes, // clase de la caja donde se encuentra el input
  validations = {}, // Objeto con las validaciones
  control, // Control del formulario
  fullWidth = false, // Si ocupa o no toda la caja donde se encuentra
  placeholder = '', // Placeholder del input
  inputProps = {}, // Propiedades del input como maxLenght
  replace = val => val, // Regex aplicado al valor para evitar carga de datos incorrecta
  defaultValue = '', // No explico
  variant = 'filled', // Variante de la caja de texto
  eyeClasses = {}, // Estilos para el ojo
  ...props
}) => (
  <Controller
    name={name}
    control={control}
    rules={validations}
    defaultValue={defaultValue}
    render={({ field, fieldState }) => (
      <>
        <FormControl
          sx={classes}
          fullWidth={fullWidth}
          onChange={({ target: { value } }) => {
            field.onChange(replace(value));
          }}
          error={fieldState.invalid}
          {...props}>
          <TextField
            id={name}
            variant={variant}
            placeholder={placeholder}
            type={showPwd ? 'text' : 'password'}
            inputProps={{
              maxLength: 64,
              ...inputProps,
            }}
            // eslint-disable-next-line react/jsx-no-duplicate-props
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPwd(prevState => !prevState)}
                    edge="end"
                    sx={eyeClasses}>
                    {showPwd ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            label={label}
            aria-describedby={name}
            error={fieldState.invalid}
            {...field}
          />
        </FormControl>
        {fieldState.invalid && (
          <FormHelperText>{fieldState.error?.message}</FormHelperText>
        )}
      </>
    )}
  />
);

export default InputPassword;
