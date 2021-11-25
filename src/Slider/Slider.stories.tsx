import { Story } from '@storybook/react'
import { formContext, FormContextArgs, argTypes } from '../storybook/formContext'
import Slider, { SliderProps } from './Slider'

export default {
  component: Slider,
  title: 'Controls/Slider',
  decorators: [formContext],
  argTypes,
}

const template: Story<FormContextArgs<SliderProps>> = ({ formContext, ...props }) => <Slider {...props} />

export const DefaultControl = template.bind({})

DefaultControl.args = {
  name: 'demo',
  fieldProps: { min: { value: 50, message: 'Minmum 50%' } },
  formContext: { defaultValues: { demo: 50 } },
}

export const WithLabel = template.bind({})

WithLabel.args = {
  name: 'demo2',
  label: <>Label <span style={{ color: 'deeppink' }}>with styles</span></>,
  fieldProps: { min: { value: 50, message: 'Minmum 50%' } },
  formContext: { defaultValues: { demo2: 50 } },
}

export const Customized = template.bind({})

const validate = ([min, max]: [number, number]) => min < 30 || max > 130 ? 'stay between 30 and 130' : true

Customized.args = {
  name: 'demo3',
  label: 'Customized slider',
  labelPosition: 'top',
  fieldProps: { validate },
  formContext: { defaultValues: { demo3: [30, 100] } },
  valueLabelDisplay: 'auto',
  step: 10,
  max: 200,
  marks: true,
  orientation: 'vertical',
  height: 300,
}
