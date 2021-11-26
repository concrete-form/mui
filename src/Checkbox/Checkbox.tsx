import { useMemo, useEffect, useState } from 'react'
import {
  CheckboxProps as CoreCheckboxProps,
  useControlProps,
  useControlState,
  useControlActions,
  parseCheckboxOptions,
} from '@concrete-form/core'
import MuiCheckbox, { CheckboxProps as MuiCheckboxProps } from '@mui/material/Checkbox'
import { FormControlProps } from '@mui/material/FormControl'

import ControlWithErrors from '../util/ControlWithErrors'
import { getControlledProps } from '../util/controlledProps'
import { fixMuiLabelPosition } from '../util/labelPosition'
import ItemsGroup from '../layout/ItemsGroup'
import ItemLabel from '../layout/ItemLabel'

type PartialMuiCheckboxProps = Omit<MuiCheckboxProps, 'checked'|'defaultChecked'|'id'|'value'|'ref'>

export type CheckboxProps = CoreCheckboxProps<PartialMuiCheckboxProps, React.ReactNode> & {
  formControlProps?: FormControlProps
} & PartialMuiCheckboxProps

const Checkbox: React.FC<CheckboxProps> = ({
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
  const parsedOptions = useMemo(() => parseCheckboxOptions(options), [options])
  const [value, setValue] = useState(Array.isArray(fieldValue) ? fieldValue : [])
  const styles = useMemo(() => fixMuiLabelPosition(orientation, labelPosition), [orientation, labelPosition])

  useEffect(() => {
    if (Array.isArray(fieldValue)) {
      setValue(fieldValue)
    }
  }, [fieldValue])

  const isChecked = (checkboxValue: string) => !!value?.includes(checkboxValue)

  const onChange = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    const checkboxValue = event.target.value
    let updatedValues = [...value]
    if (checked) {
      updatedValues.push(checkboxValue)
    } else {
      updatedValues = updatedValues.filter((existingValue: string) => existingValue !== checkboxValue)
    }
    setValue(updatedValues)
    setFieldValue(updatedValues)
  }

  // fixme: Mui doesn't seem to handle the input ref properly, forcing us to use controlled input
  const controlledProps = getControlledProps(props, inputProps, { onChange })

  return (
    <ControlWithErrors name={name} {...formControlProps}>
      <ItemsGroup
        name={name}
        orientation={orientation}
        style={styles.group}
        items={(
          <>
            { parsedOptions.map(({ label, value, props: checkboxCustomProps }) => (
              <ItemLabel
                key={value}
                name={name}
                style={styles.item}
                control={(
                  <MuiCheckbox
                    style={styles.input}
                    {...controlledProps}
                    {...checkboxCustomProps}
                    inputProps={{
                      ...props.inputProps,
                      'aria-invalid': props['aria-invalid'],
                    }}
                    value={value}
                    checked={isChecked(value)}
                  />
                )}
                label={label}
                labelPosition={labelPosition}
              />
            )) }
          </>
        )}
      />
    </ControlWithErrors>
  )
}

export default Checkbox
