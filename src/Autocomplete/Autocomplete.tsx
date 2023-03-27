import { useRef } from 'react'
import {
  AutocompleteProps as CoreAutocompleteProps,
  useControlProps,
  useControlState,
  useControlActions,
} from '@concrete-form/core'
import MuiAutocomplete, { AutocompleteProps as MuiAutocompleteProps, AutocompleteChangeReason } from '@mui/material/Autocomplete'
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
  const multiple = !!inputProps.multiple

  const onBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    if (event.target.value === '' && !multiple) {
      setFieldValue('', true, true)
    }
  }

  const onChange = async (event: React.SyntheticEvent<Element, Event>, newValue: any, reason: AutocompleteChangeReason, ...rest: any) => {
    if (inputProps?.onChange) {
      event.defaultPrevented = false
      await inputProps.onChange(event, newValue, reason, ...rest)
      if (event.defaultPrevented) {
        return
      }
    }

    switch (reason) {
      case 'clear':
        if (multiple) {
          setFieldValue([], true)
        } else {
          setFieldValue('', true)
        }
        return
      case 'selectOption':
      case 'createOption':
      case 'removeOption':
        setFieldValue(newValue, true)
    }
  }

  const onInputChange = (_: unknown, newValue: string, reason: string) => {
    if (reason === 'input' && inputProps.freeSolo && !multiple) {
      setFieldValue(newValue, true)
    }
  }

  const controlledProps = getControlledProps(props, inputProps, { onInputChange, onBlur }) as unknown as PartialMuiAutocompleteProps

  return (
    <MuiAutocomplete
      {...controlledProps}
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onChange={onChange}
      value={value || null}
      defaultValue={initialValue.current !== '' ? initialValue.current : undefined}
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
