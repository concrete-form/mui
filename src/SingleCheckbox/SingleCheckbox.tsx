import { useMemo } from 'react'
import {
  SingleCheckboxProps as CoreSingleCheckboxProps,
  useControlState,
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
  label,
  labelPosition,
  formControlProps,
  ...inputProps
}) => {
  const { value } = useControlState(name)
  const { id, ...props } = useCustomControlProps(name, {
    incomingDataFormatter: (value?: boolean) => !!value,
    outgoingDataFormatter: (value: string) => !!value,
  }, {
    ...inputProps,
    type: 'checkbox',
  }) as any
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
                ...props?.inputProps,
                'aria-invalid': props?.['aria-invalid'],
              }}
              defaultChecked={undefined}
              checked={!!value}
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
