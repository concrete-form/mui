import { Story } from '@storybook/react'
import { formContext, FormContextArgs, argTypes } from '../storybook/formContext'
import SubmitButton, { SubmitButtonProps } from './SubmitButton'

export default {
  component: SubmitButton,
  title: 'Form Controls/SubmitButton',
  decorators: [formContext],
  argTypes,
}

const wait = async (delay: number) => await new Promise(resolve => setTimeout(resolve, delay))
const onSubmit = async (data: any) => { await wait(2000) }

type SubmitButtonPropsWithChildren = FormContextArgs<SubmitButtonProps> & { children: React.ReactNode }
const template: Story<SubmitButtonPropsWithChildren> = ({ formContext, ...props }) => <SubmitButton {...props} />

export const DefaultControl = template.bind({})

DefaultControl.args = {
  children: 'Submit form (2s delay)',
  displayLoading: true,
  onSubmit,
}

export const CustomLoadingComponent = template.bind({})

CustomLoadingComponent.args = {
  children: 'Submit form (2s delay)',
  loadingComponent: <span style={{ background: 'yellow', margin: '0 5px' }}>[CUSTOM...]</span>,
  onSubmit,
}

export const AlternateLoadingContent = template.bind({})

AlternateLoadingContent.args = {
  children: 'Submit form (2s delay)',
  alternateLoadingContent: <span style={{ background: 'yellow', margin: '0 5px' }}>[CUSTOM...]</span>,
  onSubmit,
}
