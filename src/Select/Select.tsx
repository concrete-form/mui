import { useMemo, useRef, useEffect } from 'react'
import {
  SelectProps as CoreSelectProps,
  useControlProps,
  useControlState,
  useControlActions,
  parseSelectOptions,
} from '@concrete-form/core'
import MenuItem, { MenuItemProps } from '@mui/material/MenuItem'
import ListSubheader, { ListSubheaderProps } from '@mui/material/ListSubheader'
import { TextFieldProps } from '@mui/material/TextField'
import { SelectProps as MuiSelectProps, SelectChangeEvent } from '@mui/material/Select'

import TextFieldWithErrors from '../util/TextFieldWithErrors'
import { flattenOptions, getFirstValue } from '../util/selectOptions'
import { getControlledProps } from '../util/controlledProps'

type ReactOptionsProps = React.DetailedHTMLProps<React.OptionHTMLAttributes<HTMLOptionElement>, HTMLOptionElement>
type PartialReactOptionsProps = Omit<ReactOptionsProps, 'value'>
type ReactOptGroupProps = React.DetailedHTMLProps<React.OptgroupHTMLAttributes<HTMLOptGroupElement>, HTMLOptGroupElement>
type PartialReactOptGroupProps = Omit<ReactOptGroupProps, 'label'>
type NativeLabel = string | undefined
type NativeOptionsSelectProps = {
  native: true
} & CoreSelectProps<PartialReactOptGroupProps, PartialReactOptionsProps, NativeLabel>
type MuiSelectOptionsProps = {
  native?: false|undefined
} & CoreSelectProps<ListSubheaderProps, MenuItemProps, React.ReactNode>
type MixedSelectProps = NativeOptionsSelectProps | MuiSelectOptionsProps
type PartialMuiSelectProps = Omit<MuiSelectProps, 'defaultValue'|'id'|'input'|'native'|'name'|'inputRef'|'ref'>

export type SelectProps = MixedSelectProps & {
  native?: boolean
  textFieldProps?: Omit<TextFieldProps, 'SelectProps'>
} & PartialMuiSelectProps

/* istanbul ignore next ; trick to use ReturnType with a generic function */
const n = () => parseSelectOptions<PartialReactOptGroupProps, PartialReactOptionsProps, NativeLabel>()
type NativeOptions = ReturnType<typeof n>
/* istanbul ignore next ; trick to use ReturnType with a generic function */
const m = () => parseSelectOptions<ListSubheaderProps, MenuItemProps, React.ReactNode>()
type MuiOptions = ReturnType<typeof m>

const Select: React.FC<SelectProps> = ({
  name,
  children,
  options,
  allowEmpty = false,
  native = false,
  multiple = false,
  textFieldProps,
  ...selectProps
}) => {
  const props = useControlProps(name, selectProps)
  const { value } = useControlState(name)
  const initialValue = useRef(value)
  const { setFieldValue } = useControlActions(name)
  // fixme: TS is no longer to get the proper type base on "native" after React18 upgrade (now using "unknown")
  const parsedOptions = useMemo(() => parseSelectOptions<unknown, unknown, unknown>(options, children), [options, children])

  useEffect(() => {
    if (allowEmpty || multiple || props.disabled || props.readOnly) {
      return
    }
    const firstValue = getFirstValue(parsedOptions)
    if (typeof firstValue !== 'undefined') {
      setFieldValue(firstValue, false, false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const renderOptions = (options: unknown) => {
    return native ? renderNativeOptions(options as NativeOptions) : renderMuiOptions(flattenOptions(options as MuiOptions))
  }

  const renderNativeOptions = (options: NativeOptions): React.ReactNode => {
    return options.map(item => {
      switch (item.type) {
        case 'group': {
          const { label, options, props } = item
          return <optgroup key={`label:${label ?? ''}`} label={label} {...props}>{ renderNativeOptions(options) }</optgroup>
        }
        case 'option': {
          const { label, value, props } = item
          return <option key={value} value={value} {...props}>{ label }</option>
        }
        /* istanbul ignore next ; edge case if core version doesn't match this repo version */
        default:
          console.warn('Received unknown option type in select')
          return null
      }
    })
  }

  const renderMuiOptions = (options: MuiOptions): React.ReactNode => {
    return options.map((item, index) => {
      switch (item.type) {
        case 'group': {
          const { label, props } = item
          /* eslint-disable-next-line react/no-array-index-key */
          return <ListSubheader key={`label:${index}`} {...props}>{ label }</ListSubheader>
        }
        case 'option': {
          const { label, value, props } = item
          return <MenuItem key={value} value={value} {...props}>{ label }</MenuItem>
        }
        /* istanbul ignore next ; edge case if core version doesn't match this repo version */
        default:
          console.warn('Received unknown option type in select')
          return null
      }
    })
  }

  const getTargetValue = (event: SelectChangeEvent<unknown>) => {
    if (native && multiple) {
      // fixme: mui seem to use Input event instead of Select event
      const selectEvent = event as unknown as React.ChangeEvent<HTMLSelectElement>

      return Array.from(selectEvent.target.options)
        .filter((option) => option.selected)
        .map((option) => option.value)
    }
    return event.target.value
  }

  const onChange = (event: SelectChangeEvent<unknown>) => {
    setFieldValue(getTargetValue(event), true)
  }

  const onBlur = (event: React.FocusEvent<any>) => {
    setFieldValue(getTargetValue(event), true, true)
  }

  const controlledProps = getControlledProps(props, selectProps, { onChange, onBlur })
  // const defaultValue = multiple ? (initialValue.current ?? []) : (initialValue.current ?? '')

  return (
    <TextFieldWithErrors
      name={name}
      {...textFieldProps}
      SelectProps={{
        ...controlledProps,
        // defaultValue,
        native,
        multiple,
        value: multiple ? (value ?? []) : (value ?? ''),
      }}
      select
    >
      { allowEmpty && !multiple && !native && <MenuItem value="">&nbsp;</MenuItem> }
      { allowEmpty && !multiple && native && <option /> }
      { renderOptions(parsedOptions) }
      { children }
    </TextFieldWithErrors>
  )
}

export default Select
