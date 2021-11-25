import { Story } from '@storybook/react'
import { formContext, FormContextArgs, argTypes } from '../storybook/formContext'
import Autocomplete, { AutocompleteProps } from './Autocomplete'

export default {
  component: Autocomplete,
  title: 'Controls/Autocomplete',
  decorators: [formContext],
  argTypes,
}

const template: Story<FormContextArgs<AutocompleteProps>> = ({ formContext, ...props }) => <Autocomplete {...props} />

export const DefaultControl = template.bind({})

DefaultControl.args = {
  name: 'demo',
  options: ['foo', 'bar', 'baz'],
  textFieldProps: { label: 'Autocomplete control' },
  fieldProps: { required: 'This field is required' },
  formContext: { defaultValues: { demo: 'Foo' } },
}

export const FreeSolo = template.bind({})

FreeSolo.args = {
  name: 'demo2',
  options: ['foo', 'bar', 'baz'],
  freeSolo: true,
  textFieldProps: { label: 'FreeSolo ; accept all values' },
  fieldProps: { required: 'This field is required' },
  formContext: { defaultValues: { demo2: 'Custom value' } },
}
