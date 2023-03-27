import React from 'react'
import { useControlState, CustomizableLayout, useTranslator } from '@concrete-form/core'
import TextField, { TextFieldProps } from '@mui/material/TextField'

import Errors from '../layout/Errors'

type TextFieldWithErrorsProps = {
  name: string
} & TextFieldProps

const TextFieldWithErrors: React.FC<TextFieldWithErrorsProps> = ({ name, children, ...textFieldProps }) => {
  const { errors } = useControlState(name)
  const translate = useTranslator()

  const renderErrors = () => {
    return (
      <Errors
        name={name}
        errors={errors.map(translate)}
      />
    )
  }

  const control = (
    <TextField
      fullWidth
      {...textFieldProps}
      name={name}
      helperText={errors.length > 0 ? renderErrors() : textFieldProps?.helperText}
      error={errors.length > 0}
    >
      { children }
    </TextField>
  )

  return (
    <CustomizableLayout type="control" props={{ name, control }}>
      { control }
    </CustomizableLayout>
  )
}

export default TextFieldWithErrors
