import {
  InputProps as CoreInputProps,
  useControlProps,
} from '@concrete-form/core'
import { TextFieldProps } from '@mui/material/TextField'

import TextFieldWithErrors from '../util/TextFieldWithErrors'

type PartialTextFieldProps = Omit<TextFieldProps, 'defaultValue'|'id'|'inputRef'|'name'|'select'|'SelectProps'|'value'|'ref'>
export type InputProps = CoreInputProps & PartialTextFieldProps

const Input: React.FC<InputProps> = ({
  name,
  ...inputProps
}) => {
  const { ref, ...props } = useControlProps(name, inputProps)

  return (
    <TextFieldWithErrors
      name={name}
      inputRef={ref}
      {...props}
    />
  )
}

export default Input
