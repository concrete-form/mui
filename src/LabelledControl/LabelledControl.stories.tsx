import { Story } from '@storybook/react'
import Container from '@mui/material/Container'
import { formContext, FormContextArgs, argTypes } from '../storybook/formContext'
import { LabelledControlProps } from '@concrete-form/core'
import LabelledControl from './LabelledControl'
import Input from '../Input'
import Checkbox from '../Checkbox'

export default {
  component: LabelledControl,
  title: 'Layout/LabelledControl',
  decorators: [formContext],
  argTypes,
}

const templateWithSingleControl: Story<FormContextArgs<LabelledControlProps>> = ({ formContext, ...props }) => (
  <Container maxWidth="md">
    <LabelledControl {...props}>
      <Input name="demo" fieldProps={{ required: true }} />
    </LabelledControl>
  </Container>
)

const templateWithControlGroup: Story<FormContextArgs<LabelledControlProps>> = ({ formContext, ...props }) => (
  <Container maxWidth="md">
    <LabelledControl {...props}>
      <Checkbox name="demo" options={['foo', 'bar', 'baz']} fieldProps={{ required: true }} />
    </LabelledControl>
  </Container>
)

export const WithSingleControl = templateWithSingleControl.bind({})

WithSingleControl.args = {
  label: <>Label <span style={{ color: 'deeppink' }}>with styles</span>. (label LINKED to the input)</>,
  labelPosition: 'left',
}

export const WithControlGroup = templateWithControlGroup.bind({})

WithControlGroup.args = {
  label: <>Label <span style={{ color: 'deeppink' }}>with styles</span>. (label NOT linked to the inputs)</>,
  labelPosition: 'left',
}

export const Customomized = templateWithControlGroup.bind({})

Customomized.args = {
  label: <>Inverted LabelledControl with <span style={{ color: 'deeppink' }}>4 / 8 columns</span> + custom styles.</>,
  labelPosition: 'right',
  mainGridProps: { style: { background: 'rgb(235, 235, 235)', borderRadius: 10, padding: 10 } },
  labelGridProps: { sm: 8, style: { background: 'rgb(250, 250, 250)', borderRadius: 10, padding: '10px 25px' } },
  controlGridProps: { sm: 4, style: { background: '#fff', borderRadius: 10, padding: '10px 25px' } },
}
