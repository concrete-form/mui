import { useMemo } from 'react'
import {
  RadioGroupProps as CoreRadioGroupProps,
  useControlProps,
  useControlState,
  useControlActions,
  parseRadioOptions,
  mergeEventHandlers,
  removeEventHandlers,
  extractEventHandlers,
} from '@concrete-form/core'
import MuiRadioGroup from '@mui/material/RadioGroup'
import MuiRadio, { RadioProps as MuiRadioProps } from '@mui/material/Radio'
import { FormControlProps } from '@mui/material/FormControl'

import ControlWithErrors from '../util/ControlWithErrors'
import { fixMuiLabelPosition } from '../util/labelPosition'
import ItemsGroup from '../layout/ItemsGroup'
import ItemLabel from '../layout/ItemLabel'

type PartialMuiRadioProps = Omit<MuiRadioProps, 'checked'|'id'|'inputRef'|'name'|'value'|'ref'>

export type RadioGroupProps = CoreRadioGroupProps<PartialMuiRadioProps, React.ReactNode> & {
  formControlProps?: FormControlProps
} & PartialMuiRadioProps

const RadioGroup: React.FC<RadioGroupProps> = ({
  name,
  options,
  orientation,
  labelPosition,
  formControlProps,
  ...inputProps
}) => {
  const props = useControlProps(name, inputProps, true)

  const { value: fieldValue } = useControlState(name)
  const { setFieldValue } = useControlActions(name)
  const parsedOptions = useMemo(() => parseRadioOptions(options), [options])
  const styles = useMemo(() => fixMuiLabelPosition(orientation, labelPosition), [orientation, labelPosition])

  const onChange = (_: unknown, value: any) => {
    setFieldValue(value)
  }

  // fixme: Mui doesn't seem to handle the input ref properly, forcing us to use controlled input

  return (
    <ControlWithErrors name={name} {...formControlProps}>
      <MuiRadioGroup
        onChange={mergeEventHandlers(inputProps?.onChange, onChange)}
        value={fieldValue ?? ''}
      >
        <ItemsGroup
          name={name}
          orientation={orientation}
          style={styles.group}
          items={(
            <>
              { parsedOptions.map(({ label, value, props: radioCustomProps }) => {
                return (
                  <ItemLabel
                    key={value}
                    name={name}
                    style={styles.item}
                    control={(
                      <MuiRadio
                        style={styles.input}
                        {...removeEventHandlers(props)}
                        {...extractEventHandlers(inputProps)}
                        {...radioCustomProps}
                        inputProps={{
                          'aria-invalid': props['aria-invalid'],
                        }}
                        value={value}
                      />
                    )}
                    label={label}
                    labelPosition={labelPosition}
                  />
                )
              }) }
            </>
          )}
        />
      </MuiRadioGroup>
    </ControlWithErrors>
  )
}

export default RadioGroup
