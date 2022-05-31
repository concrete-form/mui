import { useRef, useMemo, useEffect } from 'react'
import {
  ToggleSwitchProps as CoreToggleSwitchProps,
  useControlProps,
  useControlState,
  useControlActions,
} from '@concrete-form/core'
import Switch, { SwitchProps as MuiSwitchProps } from '@mui/material/Switch'
import { FormControlProps } from '@mui/material/FormControl'
import Box from '@mui/material/Box'

import ControlWithErrors from '../util/ControlWithErrors'
import { fixMuiLabelPosition } from '../util/labelPosition'
import { getControlledProps } from '../util/controlledProps'
import ItemLabel from '../layout/ItemLabel'

type PartialMuiSwitchProps = Omit<MuiSwitchProps, 'checked'|'defaultChecked'|'id'|'inputRef'|'value'|'ref'>

export type ToggleSwitchProps = CoreToggleSwitchProps & {
  formControlProps?: FormControlProps
} & PartialMuiSwitchProps

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  name,
  applyInitialValue = false,
  label,
  labelPosition = 'right',
  formControlProps,
  ...inputProps
}) => {
  const props = useControlProps(name, inputProps)
  const { setFieldValue } = useControlActions(name)
  const { value } = useControlState(name)
  const initialValue = useRef(value)
  const styles = useMemo(() => fixMuiLabelPosition('vertical', labelPosition), [labelPosition])

  useEffect(() => {
    if (applyInitialValue && typeof value === 'undefined') {
      setFieldValue(false)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onChange = (event: unknown, value: boolean) => {
    setFieldValue(value, true, true)
  }

  const controlledProps = getControlledProps(props, inputProps, { onChange })

  return (
    <ControlWithErrors name={name} {...formControlProps}>
      <Box display="flex" style={styles.group}>
        <ItemLabel
          name={name}
          style={styles.item}
          control={(
            <Box style={styles.input}>
              <Switch
                {...controlledProps}
                // defaultChecked={!!initialValue.current}
                inputProps={{
                  ...props.inputProps,
                  'aria-invalid': props['aria-invalid'],
                }}
                checked={!!value}
              />
            </Box>
          )}
          label={label}
          labelPosition={labelPosition}
        />
      </Box>
    </ControlWithErrors>
  )
}

export default ToggleSwitch
