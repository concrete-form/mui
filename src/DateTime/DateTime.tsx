import {
  DateTimeProps as CoreDateTimeProps,
  useControlProps,
  useControlState,
  useControlActions,
  mergeEventHandlers,
} from '@concrete-form/core'
import DatePicker, { DatePickerProps } from '@mui/lab/DatePicker'
import TimePicker, { TimePickerProps } from '@mui/lab/TimePicker'
import DateTimePicker, { DateTimePickerProps } from '@mui/lab/DateTimePicker'
import { TextFieldProps } from '@mui/material/TextField'

import TextFieldWithErrors from '../util/TextFieldWithErrors'
import { getControlledProps } from '../util/controlledProps'
import { isValidDate } from '../util/date'

type TypeDateProps = {
  type?: 'date'
} & DatePickerProps<any>

type TypeTimeProps = {
  type: 'time'
} & TimePickerProps<any>

type TypeDateTimeProps = {
  type: 'datetime'
} & DateTimePickerProps<any>

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
    if (stringValue) {
      setFieldValue(isValidDate(value) ? value : undefined, true)
      return
    }
    setFieldValue(value ?? undefined, true)
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
          value={value ?? null}
          {...(controlledProps as unknown as Omit<TimePickerProps<any>, 'renderInput'|'value'>)}
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
          value={value ?? null}
          {...(controlledProps as unknown as Omit<DateTimePickerProps<any>, 'renderInput'|'value'>)}
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
          value={value ?? null}
          {...(controlledProps as unknown as Omit<DatePickerProps<any>, 'renderInput'|'value'>)}
        />
      )
  }
}

export default DateTime
