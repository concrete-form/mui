import { Story } from '@storybook/react'
import { formContext, FormContextArgs, argTypes } from '../storybook/formContext'
import Input, { InputProps } from './Input'

export default {
  component: Input,
  title: 'Controls/Input',
  decorators: [formContext],
  argTypes,
}

const template: Story<FormContextArgs<InputProps>> = ({ formContext, ...props }) => <Input {...props} />

export const TypeText = template.bind({})

TypeText.storyName = 'Type "text" (default)'
TypeText.args = {
  name: 'demo1',
  label: 'text',
  fieldProps: { required: 'This field is required' },
  formContext: { defaultValues: { demo1: 'Default value' } },
}

export const TypeNumber = template.bind({})

TypeNumber.storyName = 'Type "number"'
TypeNumber.args = {
  name: 'demo2',
  label: 'number',
  type: 'number',
  inputProps: { min: 5, max: 10 },
  fieldProps: { min: { value: 5, message: 'minimum 5' }, max: { value: 10, message: 'maximum 10' } },
  formContext: { defaultValues: { demo2: 7 } },
}

export const TypeEmail = template.bind({})

TypeEmail.storyName = 'Type "email"'
TypeEmail.args = {
  name: 'demo3',
  type: 'email',
  formContext: { defaultValues: { demo3: 'jdoe@email.com' } },
}

export const TypePassword = template.bind({})

TypePassword.storyName = 'Type "password"'
TypePassword.args = {
  name: 'demo4',
  type: 'password',
  formContext: { defaultValues: { demo4: 'secret' } },
}
