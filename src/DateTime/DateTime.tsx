import {
  DateTimeProps as CoreDateTimeProps,
  useControlProps,
  useControlState,
  useControlActions,
  useTranslator,
  CustomizableLayout,
} from '@concrete-form/core'
import { DatePicker, DatePickerProps } from '@mui/x-date-pickers/DatePicker'
import { TimePicker, TimePickerProps } from '@mui/x-date-pickers/TimePicker'
import { DateTimePicker, DateTimePickerProps } from '@mui/x-date-pickers/DateTimePicker'

import { getControlledProps } from '../util/controlledProps'
import { isValidDate } from '../util/date'
import Errors from '../layout/Errors'

type TypeDateProps = {
  type?: 'date'
} & DatePickerProps<Date>

type TypeTimeProps = {
  type: 'time'
} & TimePickerProps<Date>

type TypeDateTimeProps = {
  type: 'datetime'
} & DateTimePickerProps<Date>

type DateTimeInputProps = TypeTimeProps | TypeDateTimeProps | TypeDateProps
type PartialDateTimeInputProps = Omit<DateTimeInputProps, 'inputRef'|'value'|'onChange'|'ref'>

export type DateTimeProps = CoreDateTimeProps & PartialDateTimeInputProps

const DateTime: React.FC<DateTimeProps> = ({
  name,
  type = 'date',
  ...inputProps
}) => {
  const { ref, id, ...props } = useControlProps(name, inputProps)
  const { value, errors } = useControlState(name)
  const { setFieldValue } = useControlActions(name)
  const translate = useTranslator()

  const renderErrors = () => {
    return (
      <Errors
        name={name}
        errors={errors.map(translate)}
      />
    )
  }

  /* istanbul ignore next ; hard to test mui datepicker */
  const onChange = (value: Date | null, stringValue: string) => {
    if (stringValue) {
      setFieldValue(isValidDate(value) ? value : undefined, true)
      return
    }
    setFieldValue(value, true)
  }

  const controlledProps: any = getControlledProps(props, inputProps, { onChange })

  const getMuiComponent = () => {
    switch (type) {
      case 'time':
        return TimePicker
      case 'datetime':
        return DateTimePicker
      case 'date':
      default:
        return DatePicker
    }
  }

  const Component = getMuiComponent()
  const control = (
    <Component
      {...controlledProps}
      slotProps={{
        ...controlledProps.slotProps,
        textField: {
          fullWidth: true,
          'data-testid': `concrete-form:${String(type)}`,
          ...controlledProps.slotProps?.textField,
          name,
          id,
          helperText: errors.length > 0 ? renderErrors() : props?.helperText,
          error: errors.length > 0,
        },
      }}
      value={value ?? null}
    />
  )

  return (
    <CustomizableLayout type="control" props={{ name, control }}>
      { control }
    </CustomizableLayout>
  )
}

export default DateTime
