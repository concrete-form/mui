import { useRef } from 'react'
import {
  AutocompleteProps as CoreAutocompleteProps,
  useControlProps,
  useControlState,
  useControlActions,
} from '@concrete-form/core'
import MuiAutocomplete, { AutocompleteProps as MuiAutocompleteProps } from '@mui/material/Autocomplete'
import { TextFieldProps } from '@mui/material/TextField'

import TextFieldWithErrors from '../util/TextFieldWithErrors'
import { getControlledProps } from '../util/controlledProps'

type PartialMuiAutocompleteProps = Omit<MuiAutocompleteProps<any, any, any, any>, 'renderInput'|'defaultValue'|'id'|'inputValue'|'value'|'ref'>
type PartialTextFieldProps = Omit<TextFieldProps, 'defaultValue'|'id'|'inputRef'|'name'|'select'|'SelectProps'|'value'|'ref'>

export type AutocompleteProps = CoreAutocompleteProps & {
  textFieldProps?: PartialTextFieldProps
} & PartialMuiAutocompleteProps

const Autocomplete: React.FC<AutocompleteProps> = ({
  name,
  textFieldProps,
  ...inputProps
}) => {
  const props = useControlProps(name, inputProps)
  const { value } = useControlState(name)
  const { setFieldValue } = useControlActions(name)
  const initialValue = useRef(value)

  const onChange = (event: unknown, newValue: any, reason: string) => {
    setFieldValue(newValue === null ? '' : newValue, true)
  }

  const onBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFieldValue(event.target.value, true, true)
  }

  const controlledProps = getControlledProps(props, inputProps, { onChange, onBlur }) as unknown as PartialMuiAutocompleteProps

  /* MUI Autocomplete control the rendered input so we also need to control it */
  // fixme : there is a bug when you select an option with keyboard (mui does not call onChange or any other event handlers)
  // so when selecting a value with keyboard and submitting form without triggering onBlur, the value is not save

  return (
    <MuiAutocomplete
      {...controlledProps}
      defaultValue={initialValue.current}
      renderInput={params => (
        <TextFieldWithErrors
          name={name}
          {...textFieldProps}
          {...params}
          inputProps={{ ...textFieldProps?.inputProps, ...params?.inputProps }}
        />
      )}
    />
  )
}

export default Autocomplete
