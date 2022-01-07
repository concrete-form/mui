import { Story } from '@storybook/react'
import FavoriteBorder from '@mui/icons-material/FavoriteBorder'
import Favorite from '@mui/icons-material/Favorite'
import { formContext, FormContextArgs, argTypes } from '../storybook/formContext'
import CheckboxesGroup, { CheckboxesGroupProps } from './CheckboxesGroup'

export default {
  component: CheckboxesGroup,
  title: 'Controls Group/Checkboxes',
  decorators: [formContext],
  argTypes,
}

const defaultOptions = [
  'first',
  { label: 'with label', value: 'second' },
  { label: <span style={{ fontWeight: 'bold', color: 'deeppink' }}>with style</span>, value: 'third' },
  { label: 'disabled', value: 'fourth', props: { disabled: true } },
  'last',
]

const template: Story<FormContextArgs<CheckboxesGroupProps>> = ({ formContext, ...props }) => <CheckboxesGroup {...props} />

export const DefaultControl = template.bind({})

DefaultControl.args = {
  name: 'demo',
  fieldProps: { required: 'This field is required' },
  formContext: { defaultValues: { demo: ['second'] } },
  options: defaultOptions,
}

export const CustomIcon = template.bind({})

CustomIcon.args = {
  name: 'demo2',
  orientation: 'horizontal',
  labelPosition: 'top',
  icon: <FavoriteBorder />,
  checkedIcon: <Favorite />,
  fieldProps: { required: 'This field is required' },
  formContext: { defaultValues: { demo2: ['second'] } },
  options: defaultOptions,
}
