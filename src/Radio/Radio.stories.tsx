import { Story } from '@storybook/react'
import FavoriteBorder from '@mui/icons-material/FavoriteBorder'
import Favorite from '@mui/icons-material/Favorite'
import { formContext, FormContextArgs, argTypes } from '../storybook/formContext'
import Radio, { RadioProps } from './Radio'

export default {
  component: Radio,
  title: 'Controls Group/Radio',
  decorators: [formContext],
  argTypes,
}

const defaultOptions = [
  { label: <em>None</em>, value: '' },
  'first',
  { label: 'with label', value: 'second' },
  { label: <span style={{ fontWeight: 'bold', color: 'deeppink' }}>with style</span>, value: 'third' },
  { label: 'disabled', value: 'fourth', props: { disabled: true } },
  'last',
]

const validateNotEmpty = (value: string) => value === '' ? 'This field is required' : true

const template: Story<FormContextArgs<RadioProps>> = ({ formContext, ...props }) => <Radio {...props} />

export const DefaultControl = template.bind({})

DefaultControl.args = {
  name: 'demo',
  fieldProps: { validate: validateNotEmpty },
  formContext: { defaultValues: { demo: 'second' } },
  options: defaultOptions,
}

export const CustomIcon = template.bind({})

CustomIcon.args = {
  name: 'demo2',
  orientation: 'horizontal',
  labelPosition: 'top',
  icon: <FavoriteBorder />,
  checkedIcon: <Favorite />,
  fieldProps: { validate: validateNotEmpty },
  formContext: { defaultValues: { demo2: 'second' } },
  options: defaultOptions,
}
