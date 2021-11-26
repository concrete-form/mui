import React from 'react'
import {
  ErrorsLayoutProps as CoreErrorsLayoutProps,
  CustomizableLayout,
} from '@concrete-form/core'

export type ErrorsLayoutProps = CoreErrorsLayoutProps

const Errors: React.FC<ErrorsLayoutProps> = (props) => {
  const {
    errors,
  } = props

  return (
    <CustomizableLayout type="errors" props={props}>
      <>
        { errors.map(error => (
          <React.Fragment key={error}>
            { error }<br />
          </React.Fragment>
        )) }
      </>
    </CustomizableLayout>
  )
}

export default Errors
