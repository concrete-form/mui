import {
  TextareaProps as CoreTextareaProps,
} from '@concrete-form/core'

import Input, { InputProps } from '../Input'

export type TextareaProps = CoreTextareaProps & Omit<InputProps, 'multiline'>

const Textarea: React.FC<TextareaProps> = ({
  ...inputProps
}) => <Input minRows={2} {...inputProps} multiline />

export default Textarea
