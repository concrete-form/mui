import {
  DateTimeProps as CoreDateTimeProps,
  useControlProps,
  useControlState,
  useControlActions,
  mergeEventHandlers,
} from '@concrete-form/core'
import { DatePicker, DatePickerProps } from '@mui/x-date-pickers/DatePicker'
import { TimePicker, TimePickerProps } from '@mui/x-date-pickers/TimePicker'
import { DateTimePicker, DateTimePickerProps } from '@mui/x-date-pickers/DateTimePicker'
import { TextFieldProps } from '@mui/material/TextField'

import TextFieldWithErrors from '../util/TextFieldWithErrors'
import { getControlledProps } from '../util/controlledProps'
import { isValidDate } from '../util/date'

type TypeDateProps = {
  type?: 'date'
} & DatePickerProps<any, any>

type TypeTimeProps = {
  type: 'time'
} & TimePickerProps<any, any>

type TypeDateTimeProps = {
  type: 'datetime'
} & DateTimePickerProps<any, any>

type DateTimeInputProps = TypeTimeProps | TypeDateTimeProps | TypeDateProps
type PartialDateTimeInputProps = Omit<DateTimeInputProps, 'renderInput'|'inputRef'|'value'|'onChange'|'ref'>
type PartialTextFieldProps = Omit<TextFieldProps, 'defaultValue'|'id'|'inputRef'|'name'|'select'|'SelectProps'|'value'|'ref'>

export type DateTimeProps = CoreDateTimeProps & {
  textFieldProps?: PartialTextFieldProps
  returnDateObject?: boolean
} & PartialDateTimeInputProps

const DateTime: React.FC<DateTimeProps> = ({
  name,
  type,
  textFieldProps,
  ...inputProps
}) => {
  const { ref, id, ...props } = useControlProps(name, inputProps)
  const { value } = useControlState(name)
  const { setFieldValue } = useControlActions(name)

  const onChange = (value: Date | null, stringValue: string) => {
    /* istanbul ignore next ; hard to test since the tests used the mobile version */
    if (stringValue) {
      setFieldValue(isValidDate(value) ? value : undefined, true)
      return
    }
    setFieldValue(value, true)
  }

  const onBlur = (event: React.FocusEvent<HTMLInputElement>, ...rest: any) => {
    const manualValue = event.target.value
    if (manualValue === '') {
      setFieldValue(undefined, true)
    }
  }

  const controlledProps = getControlledProps(props, inputProps, { onChange })

  switch (type) {
    case 'time':
      return (
        <TimePicker
          renderInput={params => (
            <TextFieldWithErrors
              name={name}
              {...params}
              {...textFieldProps}
              id={id}
              data-testid={`concrete-form:${type}`}
              onBlur={mergeEventHandlers(textFieldProps?.onBlur, onBlur)}
            />
          )}
          {...(controlledProps as unknown as Omit<TimePickerProps<any, any>, 'renderInput'|'value'>)}
          value={value ?? null}
        />
      )
    case 'datetime':
      return (
        <DateTimePicker
          renderInput={params => (
            <TextFieldWithErrors
              name={name}
              {...params}
              {...textFieldProps}
              id={id}
              data-testid={`concrete-form:${type}`}
              onBlur={mergeEventHandlers(textFieldProps?.onBlur, onBlur)}
            />
          )}
          {...(controlledProps as unknown as Omit<DateTimePickerProps<any, any>, 'renderInput'|'value'>)}
          value={value ?? null}
        />
      )
    case 'date':
    default:
      return (
        <DatePicker
          renderInput={params => (
            <TextFieldWithErrors
              name={name}
              {...params}
              {...textFieldProps}
              id={id}
              data-testid={`concrete-form:${type ?? 'date'}`}
              onBlur={mergeEventHandlers(textFieldProps?.onBlur, onBlur)}
            />
          )}
          {...(controlledProps as unknown as Omit<DatePickerProps<any, any>, 'renderInput'|'value'>)}
          value={value ?? null}
        />
      )
  }
}

export default DateTime
