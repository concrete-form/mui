import React from 'react'
import { ErrorsLayoutProps, CustomizableLayout, Translation, useTranslator } from '@concrete-form/core'
import FormHelperText from '@mui/material/FormHelperText'

const Errors: React.FC<ErrorsLayoutProps> = (props) => {
  const { errors } = props
  const translate = useTranslator()
  return (
    <CustomizableLayout type="errors" props={props}>
      <FormHelperText>

        { errors.map((error: Translation) => {
          const translatedError = translate(error)
          return <React.Fragment key={translatedError}>{ translatedError }<br /></React.Fragment>
        }) }

      </FormHelperText>
    </CustomizableLayout>
  )
}

export default Errors
