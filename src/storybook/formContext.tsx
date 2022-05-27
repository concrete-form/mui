import Form from '@concrete-form/react-hook-form'
import { useForm, UseFormProps, SubmitHandler } from 'react-hook-form'
import { LocalizationProvider } from '@mui/lab/'
import AdapterDateFns from '@mui/lab/AdapterDateFns'

export type FormContextArgs<T> = {
  formContext?: UseFormProps
  onSubmit?: SubmitHandler<any>
} & T

type FormWrapperProps = {
  children?: React.ReactNode
  formContext?: UseFormProps
  onSubmit?: SubmitHandler<any>
}

export const FormWrapper: React.FC<FormWrapperProps> = ({
  formContext,
  onSubmit,
  children,
}) => {
  const defaultOnSubmit = (data: any) => { console.log('Form submitted', data) }
  const form = useForm({
    mode: 'onTouched',
    criteriaMode: 'all',
    ...formContext,
  })
  return (
    <Form
      form={form}
      noValidate={false}
      onSubmit={onSubmit ?? defaultOnSubmit}
    >
      { children }
    </Form>
  )
}

export const formContext = (Story: React.ElementType, context: {args: FormContextArgs<any>}) => (
  <LocalizationProvider dateAdapter={AdapterDateFns}>
    <FormWrapper formContext={context.args?.formContext ?? {}} onSubmit={context.args?.onSubmit}>
      <Story />
    </FormWrapper>
  </LocalizationProvider>
)

export const argTypes = {
  formContext: {
    table: {
      disable: true,
    },
  },
}
