import { Story } from '@storybook/react'
import { formContext, FormContextArgs, argTypes } from '../storybook/formContext'
import FileInput, { FileInputProps } from './FileInput'

export default {
  component: FileInput,
  title: 'Controls/FileInput',
  decorators: [formContext],
  argTypes,
}

const template: Story<FormContextArgs<FileInputProps>> = ({ formContext, ...props }) => <FileInput {...props} />

export const DefaultControl = template.bind({})

DefaultControl.args = {
  name: 'demo1',
}

export const MultipleFiles = template.bind({})

MultipleFiles.args = {
  name: 'demo2',
  inputProps: { multiple: true },
}
