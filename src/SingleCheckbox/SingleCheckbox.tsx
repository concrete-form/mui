import { useMemo } from 'react'
import {
  SingleCheckboxProps as CoreSingleCheckboxProps,
  useCustomControlProps,
} from '@concrete-form/core'
import MuiCheckbox, { CheckboxProps as MuiCheckboxProps } from '@mui/material/Checkbox'
import { FormControlProps } from '@mui/material/FormControl'
import Box from '@mui/material/Box'

import ControlWithErrors from '../util/ControlWithErrors'
import { fixMuiLabelPosition } from '../util/labelPosition'
import ItemLabel from '../layout/ItemLabel'

type PartialMuiCheckboxProps = Omit<MuiCheckboxProps, 'checked'|'defaultChecked'|'id'|'value'|'ref'>

export type SingleCheckboxProps = CoreSingleCheckboxProps & {
  formControlProps?: FormControlProps
} & PartialMuiCheckboxProps

const SingleCheckbox: React.FC<SingleCheckboxProps> = ({
  name,
  applyInitialValue = false,
  label,
  labelPosition,
  formControlProps,
  ...inputProps
}) => {
  const props = useCustomControlProps(name, {
    incomingDataFormatter: (value?: boolean) => !!value,
    outgoingDataFormatter: (value: string) => !!value,
    formatInitialValue: applyInitialValue,
  }, {
    ...inputProps,
    type: 'checkbox',
  })
  const styles = useMemo(() => fixMuiLabelPosition('vertical', labelPosition), [labelPosition])

  return (
    <ControlWithErrors name={name} {...formControlProps}>
      <Box display="flex" style={styles.group}>
        <ItemLabel
          name={name}
          style={styles.item}
          control={(
            <MuiCheckbox
              style={styles.input}
              {...props}
              inputProps={{
                ...(props as any)?.inputProps,
                'aria-invalid': (props as any)['aria-invalid'],
              }}
            />
          )}
          label={label}
          labelPosition={labelPosition}
        />
      </Box>
    </ControlWithErrors>
  )
}

export default SingleCheckbox
