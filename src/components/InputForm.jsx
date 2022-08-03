import { Controller } from 'react-hook-form';
import { FormControl, FormHelperText, TextField } from '@mui/material';

const InputForm = ({
  name, // Nombre del campo
  label, // label del campo
  variant = 'filled', // Variante de la caja de texto
  className, // estilos para la caja de el input
  control, // control proveniente de react-hook-form
  validations = {}, // Objeto con las validaciones
  disabled = false,
  fullWidth = false, // Si ocupa o no toda la caja donde se encuentra
  placeholder = '', // Placeholder
  inputProps = {}, // Propiedades del input como maxLenght
  InputProps = {}, // Propiedades del input de MUI
  required = false, // Marcar campo como requerido
  replace = val => val, // Regex aplicado al valor para evitar carga de datos incorrecta
  defaultValue = '', // No explico
  onClick = () => {}, // Evento cuando pulse la caja de texto
  type = 'text', // Tipo de la caja de texto
  onKeyDown = () => {}, // Funcion para cuando pulse una tecla
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
          fullWidth={fullWidth}
          sx={className}
          onChange={({ target: { value } }) => {
            field.onChange(replace(value));
          }}
          onClick={() => onClick()}
          error={fieldState.invalid}
          {...props}>
          <TextField
            id={name}
            variant={variant}
            placeholder={placeholder}
            type={type}
            inputProps={inputProps}
            required={required}
            error={fieldState.invalid}
            // eslint-disable-next-line react/jsx-no-duplicate-props
            InputProps={InputProps}
            label={label}
            disabled={disabled}
            aria-describedby={name}
            onKeyDown={onKeyDown}
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

export default InputForm;
