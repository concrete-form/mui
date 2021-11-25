import { Story } from '@storybook/react'
import { formContext, FormContextArgs, argTypes } from '../storybook/formContext'
import Textarea, { TextareaProps } from './Textarea'

export default {
  component: Textarea,
  title: 'Controls/Textarea',
  decorators: [formContext],
  argTypes,
}

const template: Story<FormContextArgs<TextareaProps>> = ({ formContext, ...props }) => <Textarea {...props} />

export const DefaultControl = template.bind({})

DefaultControl.args = {
  name: 'demo',
  fieldProps: { required: 'This field is required' },
  formContext: { defaultValues: { demo: 'default\nvalue' } },
}
