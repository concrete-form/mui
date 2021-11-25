import { ControlLayoutProps as CoreControlLayoutProps, CustomizableLayout } from '@concrete-form/core'
import FormControl, { FormControlProps } from '@mui/material/FormControl'

export type ControlLayoutProps = CoreControlLayoutProps & FormControlProps

const Control: React.FC<ControlLayoutProps> = (props) => {
  const {
    name,
    control,
    errors,
    ...controlProps
  } = props
  return (
    <CustomizableLayout type="control" props={props}>
      <FormControl fullWidth {...controlProps} error={!!errors}>
        { control }
        { errors }
      </FormControl>
    </CustomizableLayout>
  )
}

export default Control
