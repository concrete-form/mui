import { Story } from '@storybook/react'
import { formContext, FormContextArgs, argTypes } from '../storybook/formContext'
import ToggleSwitch, { ToggleSwitchProps } from './ToggleSwitch'

export default {
  component: ToggleSwitch,
  title: 'Controls/ToggleSwitch',
  decorators: [formContext],
  argTypes,
}

const template: Story<FormContextArgs<ToggleSwitchProps>> = ({ formContext, ...props }) => <ToggleSwitch {...props} />

export const DefaultControl = template.bind({})

DefaultControl.args = {
  name: 'demo',
  label: <>Label <span style={{ color: 'deeppink' }}>with styles</span></>,
  fieldProps: { required: 'This field is required' },
  formContext: { defaultValues: { demo: false } },
}
