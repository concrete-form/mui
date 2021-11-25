import {
  CustomControlProps as CoreCustomControlProps,
  useCustomControlProps,
} from '@concrete-form/core'

import TextFieldWithErrors from '../util/TextFieldWithErrors'

export type CustomControlProps = CoreCustomControlProps & { [key: string]: any }

const CustomControl: React.FC<CustomControlProps> = ({
  name,
  render,
  incomingDataFormatter,
  outgoingDataFormatter,
  applyLocally,
  formatInitialValue,
  ...inputProps
}) => {
  const parameters = {
    incomingDataFormatter,
    outgoingDataFormatter,
    applyLocally,
    formatInitialValue,
  }
  const props = useCustomControlProps(name, parameters, inputProps)
  const renderComponent = render ?? (props => <TextFieldWithErrors name={name} {...props} />)

  return renderComponent({ ...props })
}

export default CustomControl
