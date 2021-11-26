import { useControlState, useTranslator } from '@concrete-form/core'
import { FormControlProps } from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'

import Control from '../layout/Control'
import Errors from '../layout/Errors'

type ControlWithErrorsProps = {
  name: string
} & FormControlProps

const ControlWithErrors: React.FC<ControlWithErrorsProps> = ({ name, children, ...formControlProps }) => {
  const { errors } = useControlState(name)
  const translate = useTranslator()

  const renderErrors = () => {
    if (!errors || errors?.length === 0) {
      return
    }
    return (
      <FormHelperText error>
        <Errors
          name={name}
          errors={errors.map(translate)}
        />
      </FormHelperText>
    )
  }

  return (
    <Control
      name={name}
      control={children}
      errors={renderErrors()}
      {...formControlProps}
    />
  )
}

export default ControlWithErrors
