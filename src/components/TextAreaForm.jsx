import React from 'react';
import { Controller } from 'react-hook-form';
import {
  FormControl,
  FormHelperText,
  TextField,
  Box,
  Typography,
} from '@mui/material';

const TextAreaForm = ({
  name, // Nombre del campo
  label, // label del campo
  className = {}, // estilos para la caja de el input
  control, // control proveniente de react-hook-form
  validations = {}, // Objeto con las validaciones
  disabled = false,
  fullWidth = false, // Si ocupa o no toda la caja donde se encuentra
  placeholder = '', // Placeholder
  inputProps = {}, // Propiedades del input como maxLenght
  required = false, // Marcar campo como requerido
  replace = val => val, // Regex aplicado al valor para evitar carga de datos incorrecta
  defaultValue = '', // No explico
  rows = 4, // Filas de el input
  showMax = false, // Booleano para mostrar o no el maximo contra lo escrito FORMATO 'writed/max'
  variant = 'outlined', // Variante de la caja de texto
  lengthStyle = {}, // Estilo de el texto que muestra el length disponible
  ...props
}) => (
  <Controller
    name={name}
    control={control}
    rules={validations}
    defaultValue={defaultValue}
    render={({ field, fieldState }) => (
      <Box
        sx={{
          width: fullWidth ? '100%' : 'auto',
        }}>
        <FormControl
          fullWidth={fullWidth}
          sx={className}
          required={required}
          onChange={({ target: { value } }) => {
            field.onChange(replace(value));
          }}
          error={fieldState.invalid}
          {...props}>
          <TextField
            id={name}
            variant={variant}
            placeholder={placeholder}
            type="text"
            inputProps={inputProps}
            label={label}
            disabled={disabled}
            aria-describedby={name}
            multiline
            rows={rows}
            error={fieldState.invalid}
            {...field}
          />
        </FormControl>
        <Box
          display="flex"
          justifyContent={`${
            // eslint-disable-next-line no-nested-ternary
            showMax
              ? fieldState.invalid
                ? 'space-between'
                : 'flex-end'
              : 'flex-start'
          }`}>
          {fieldState.invalid && (
            <FormHelperText>{fieldState.error?.message}</FormHelperText>
          )}
          {showMax && inputProps.maxLength ? (
            <Typography variant="p" component="p" sx={lengthStyle}>
              {field.value.length}/{inputProps.maxLength}
            </Typography>
          ) : null}
        </Box>
      </Box>
    )}
  />
);

export default TextAreaForm;
