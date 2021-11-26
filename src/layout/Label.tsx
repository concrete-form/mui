import {
  LabelLayoutProps as CoreLabelLayoutProps,
  CustomizableLayout,
} from '@concrete-form/core'
import FormLabel, { FormLabelProps } from '@mui/material/FormLabel'

export type LabelLayoutProps = CoreLabelLayoutProps & FormLabelProps

const Label: React.FC<LabelLayoutProps> = (props) => {
  const {
    label,
    htmlFor,
    ...labelProps
  } = props
  return (
    <CustomizableLayout type="label" props={props}>
      <FormLabel
        htmlFor={htmlFor}
        {...labelProps}
      >
        { label }
      </FormLabel>
    </CustomizableLayout>
  )
}

export default Label
