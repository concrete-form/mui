import {
  LabelLayoutProps as CoreLabelLayoutProps,
  CustomizableLayout,
} from '@concrete-form/core'
import FormLabel, { FormLabelProps } from '@mui/material/FormLabel'

export type LabelProps = CoreLabelLayoutProps & FormLabelProps

const Label: React.FC<LabelProps> = (props) => {
  const {
    label,
    htmlFor,
    ...labelProps
  } = props
  return (
    <CustomizableLayout type="label" props={props}>
      <FormLabel
        className="concreteform-label"
        htmlFor={htmlFor}
        {...labelProps}
      >
        { label }
      </FormLabel>
    </CustomizableLayout>
  )
}

export default Label
