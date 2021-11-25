import { render as testingLibraryRender } from '@testing-library/react'
import { LocalizationProvider } from '@mui/lab/'
import AdapterDateFns from '@mui/lab/AdapterDateFns'

import FormContext, { FormOptions } from './FormContext'

const render = (content: React.ReactNode, options?: FormOptions) => testingLibraryRender(
  <LocalizationProvider dateAdapter={AdapterDateFns}>
    <FormContext options={options}>
      { content }
    </FormContext>
  </LocalizationProvider>,
)

export default render
