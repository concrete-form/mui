import {
  LabelledcontrolProps as CoreLabelledcontrolProps,
  useControlLabelFor,
} from '@concrete-form/core'
import { GridProps } from '@mui/material/Grid'
import { FormLabelProps } from '@mui/material/FormLabel'

import LabelledControlLayout from '../layout/LabelledControl'
import Label from '../layout/Label'

export type LabelledcontrolProps = CoreLabelledcontrolProps & {
  mainGridProps?: GridProps
  labelGridProps?: GridProps
  controlGridProps?: GridProps
}

const Labelledcontrol: React.FC<LabelledcontrolProps & FormLabelProps> = ({
  label,
  labelPosition,
  children,
  mainGridProps,
  labelGridProps,
  controlGridProps,
  ...labelProps
}) => {
  const htmlFor = useControlLabelFor(children)
  return (
    <LabelledControlLayout
      label={<Label label={label} htmlFor={htmlFor} {...labelProps} />}
      labelPosition={labelPosition}
      control={children}
      mainGridProps={mainGridProps}
      labelGridProps={labelGridProps}
      controlGridProps={controlGridProps}
    />
  )
}

export default Labelledcontrol
