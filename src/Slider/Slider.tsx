import { useRef } from 'react'
import {
  SliderProps as CoreSliderProps,
  useControlProps,
  useControlState,
  useControlActions,
} from '@concrete-form/core'
import MuiSlider, { SliderProps as MuiSliderProps } from '@mui/material/Slider'
import { FormControlProps } from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import Box from '@mui/material/Box'

import ControlWithErrors from '../util/ControlWithErrors'
import { getControlledProps } from '../util/controlledProps'

type PartialMuiSliderProps = Omit<MuiSliderProps, 'defaultValue'|'name'|'value'|'ref'>

export type SliderProps = CoreSliderProps & {
  formControlProps?: FormControlProps
  height?: number
} & PartialMuiSliderProps

const Slider: React.FC<SliderProps> = ({
  name,
  label,
  labelPosition = 'top',
  formControlProps,
  height,
  orientation,
  ...inputProps
}) => {
  const props = useControlProps(name, inputProps)
  const { value } = useControlState(name)
  const initialValue = useRef(value)
  const { setFieldValue } = useControlActions(name)

  if (!['top', 'bottom'].includes(labelPosition)) {
    labelPosition = 'top'
    console.warn('Label can only be vertical with MUI Switch')
  }

  const onChange = (_: unknown, newValue: number|number[]) => {
    setFieldValue(newValue)
  }

  const renderLabel = () => <FormLabel component="legend" data-testid="item-label" data-label-position={labelPosition}>{ label }</FormLabel>

  if (orientation === 'vertical' && typeof height === 'undefined') {
    console.warn('Missing "height" prop with vertical slider')
    height = 150
  }
  if (orientation !== 'vertical' && typeof height !== 'undefined') {
    console.warn('Prop "height" has no effect when slider is not vertical')
    height = 150
  }

  const getWrapperStyle = () => {
    const style: Record<string, any> = {
      paddingLeft: 8,
      paddingRight: 8,
    }
    if (orientation === 'vertical') {
      style.height = height
      style.marginTop = label && labelPosition === 'top' ? 16 : undefined
      style.marginBottom = labelPosition === 'bottom' ? 16 : undefined
    }
    return style
  }

  const controlledProps = getControlledProps(props, inputProps, { onChange })

  return (
    <ControlWithErrors name={name} {...formControlProps}>
      { label && labelPosition === 'top' && renderLabel() }
      <Box data-testid="slider-wrapper" style={getWrapperStyle()}>
        <MuiSlider
          {...controlledProps}
          orientation={orientation}
          defaultValue={initialValue.current}
        />
      </Box>
      { label && labelPosition === 'bottom' && renderLabel() }
    </ControlWithErrors>
  )
}

export default Slider
