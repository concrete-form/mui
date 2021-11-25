import { Story } from '@storybook/react'
import { formContext, FormContextArgs, argTypes } from '../storybook/formContext'
import Select, { SelectProps } from './Select'

export default {
  component: Select,
  title: 'Controls/Select',
  decorators: [formContext],
  argTypes,
}

// regarding "as const" : https://stackoverflow.com/questions/48087015/typescript-error-during-inline-fontweight-style-in-react

const defaultOptions = [
  'first',
  { label: 'with label', value: 'second' },
  { label: 'with style', value: 'third', props: { style: { fontWeight: 'bold', color: 'deeppink' } as const } },
  { label: 'disabled', value: 'fourth', props: { disabled: true } },
  'last',
]

const defaultGroupOptions = [
  {
    group: '[GROUP] First group',
    options: defaultOptions,
  },
  'option with no group',
  {
    group: '[GROUP] Group with style',
    options: ['foo1', 'bar1'],
    props: { style: { fontWeight: 'bold', color: '#336699' } as const },
  },
  {
    group: '[GROUP] empty group',
    options: [],
  },
  {
    group: '[GROUP] Disabled group',
    options: ['foo2', 'bar2'],
    props: { disabled: true },
  },
]

const template: Story<FormContextArgs<SelectProps>> = ({ formContext, ...props }) => <Select {...props} />
const templateWithChildren: Story<FormContextArgs<SelectProps>> = ({ formContext, ...props }) => (
  <Select {...props}>
    <option value="">Empty</option>
    <option value="foo">foo</option>
    <option value="bar">bar</option>
    <option value="baz">baz</option>
  </Select>
)

export const DefaultControl = template.bind({})

DefaultControl.args = {
  name: 'demo1',
  fieldProps: { required: 'This field is required' },
  formContext: { defaultValues: { demo1: 'second' } },
  options: defaultOptions,
}

export const WithGroups = template.bind({})

WithGroups.args = {
  name: 'demo2',
  fieldProps: { required: 'This field is required' },
  formContext: { defaultValues: { demo2: 'first' } },
  options: defaultGroupOptions,
}

export const WithChildren = templateWithChildren.bind({})

WithChildren.args = {
  name: 'demo3',
  fieldProps: { required: 'This field is required' },
  formContext: { defaultValues: { demo3: 'bar' } },
}
