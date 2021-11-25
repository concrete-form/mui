import React from 'react'
import { useControlState, CustomizableLayout, useTranslator, Translation } from '@concrete-form/core'
import TextField, { TextFieldProps } from '@mui/material/TextField'

type TextFieldWithErrorsProps = {
  name: string
} & TextFieldProps

const TextFieldWithErrors: React.FC<TextFieldWithErrorsProps> = ({ name, children, ...textFieldProps }) => {
  const { errors } = useControlState(name)
  const translate = useTranslator()
  const renderErrors = () => (
    <CustomizableLayout type="errors" props={{ name, errors }}>
      <>
        { errors.map((error: Translation) => {
          const translatedError = translate(error)
          return <React.Fragment key={translatedError}>{ translatedError }<br /></React.Fragment>
        }) }
      </>
    </CustomizableLayout>
  )

  const control = (
    <TextField
      name={name}
      fullWidth
      {...textFieldProps}
      helperText={errors.length > 0 ? renderErrors() : textFieldProps?.helperText}
      error={errors.length > 0}
    >
      { children }
    </TextField>
  )

  return (
    <CustomizableLayout type="control" props={{ name, control, errors }}>
      { /* eslint-disable-next-line react/jsx-no-useless-fragment */ }
      <>{ control }</>
    </CustomizableLayout>
  )
}

export default TextFieldWithErrors
