import { Story } from '@storybook/react'
import { formContext, FormContextArgs, argTypes } from '../storybook/formContext'
import DateTimeInput, { DateTimeProps } from './DateTime'

export default {
  component: DateTimeInput,
  title: 'Controls/DateTime',
  decorators: [formContext],
  argTypes,
}

const template: Story<FormContextArgs<DateTimeProps>> = ({ formContext, ...props }) => <DateTimeInput {...props} />

export const TypeDate = template.bind({})

TypeDate.storyName = 'Type "date" (default)'
TypeDate.args = {
  name: 'demo1',
  type: 'date',
  fieldProps: { required: 'This field is required' },
  formContext: { defaultValues: { demo1: new Date('2021-01-01T00:00:00') } },
}

export const TypeTime = template.bind({})

TypeTime.storyName = 'Type "time"'
TypeTime.args = {
  name: 'demo2',
  type: 'time',
  fieldProps: { required: 'This field is required' },
  formContext: { defaultValues: { demo2: new Date('2021-01-01T00:00:00') } },
}

export const TypeDateTime = template.bind({})

TypeDateTime.storyName = 'Type "datetime"'
TypeDateTime.args = {
  name: 'demo3',
  type: 'datetime',
  fieldProps: { required: 'This field is required' },
  formContext: { defaultValues: { demo3: new Date('2021-01-01T00:00:00') } },
}
