import { Story } from '@storybook/react'
import { formContext, FormContextArgs, argTypes } from '../storybook/formContext'
import SingleCheckbox, { SingleCheckboxProps } from './SingleCheckbox'

export default {
  component: SingleCheckbox,
  title: 'Controls/SingleCheckbox',
  decorators: [formContext],
  argTypes,
}

const preventDefaultClick = (event: React.MouseEvent<HTMLElement>) => { event.preventDefault() }

const template: Story<FormContextArgs<SingleCheckboxProps>> = ({ formContext, ...props }) => <SingleCheckbox {...props} />

export const DefaultControl = template.bind({})

DefaultControl.args = {
  name: 'demo',
  label: <>I accept the <a href="#fake" onClick={preventDefaultClick}>terms and conditions</a></>,
  fieldProps: { required: 'You must accept the terms and conditions' },
  formContext: { defaultValues: { demo: false } },
}
