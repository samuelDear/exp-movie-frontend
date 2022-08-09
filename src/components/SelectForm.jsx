import React from 'react';
import { Controller } from 'react-hook-form';
import {
  FormControl,
  InputLabel,
  FormHelperText,
  Select,
  MenuItem,
} from '@mui/material';

const SelectForm = ({
  name, // Nombre del campo
  label, // label del campo
  className = {}, // estilos para la caja de el input
  classNameSelect = {}, // Estilo para el select
  control, // control proveniente de react-hook-form
  validations = {}, // Objeto con las validaciones
  items = [], // Items para el listado
  disabled = false, // Marcar campo deshabilitado
  fullWidth = false, // Si ocupa o no toda la caja donde se encuentra
  required = false, // Marcar campo como requerido
  defaultValue = '', // Valor por defecto
  variant = 'outlined', // Variante del input
  inputProps = {}, // Propiedades del input
  classes = {}, // Propiedades del input de MUI
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
          required={required}
          onChange={({ target: { value } }) => {
            field.onChange(value);
          }}
          error={fieldState.invalid}
          variant={variant}
          {...props}>
          {label !== '' ? <InputLabel id={name}>{label}</InputLabel> : null}
          <Select
            labelId={name}
            id={name}
            label={label}
            disabled={disabled}
            inputProps={inputProps}
            classes={classes}
            sx={classNameSelect}
            {...field}>
            {items.map((el, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <MenuItem key={`${name}-${el.label}-${index}`} value={el.value}>
                {el.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {fieldState.invalid && (
          <FormHelperText>{fieldState.error?.message}</FormHelperText>
        )}
      </>
    )}
  />
);

export default SelectForm;
