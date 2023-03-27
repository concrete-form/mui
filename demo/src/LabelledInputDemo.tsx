/* eslint-disable react/jsx-curly-spacing */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react'

import Form from '@concrete-form/react-hook-form'
import Autocomplete from '@concrete-form/mui/Autocomplete'
import Input from '@concrete-form/mui/Input'
import CheckboxGroup from '@concrete-form/mui/CheckboxGroup'
import CustomControl from '@concrete-form/mui/CustomControl'
import DateTime from '@concrete-form/mui/DateTime'
import FileInput from '@concrete-form/mui/FileInput'
import RadioGroup from '@concrete-form/mui/RadioGroup'
import Select from '@concrete-form/mui/Select'
import SingleCheckbox from '@concrete-form/mui/SingleCheckbox'
import Slider from '@concrete-form/mui/Slider'
import Textarea from '@concrete-form/mui/Textarea'
import ToggleSwitch from '@concrete-form/mui/ToggleSwitch'
import SubmitButton from '@concrete-form/mui/SubmitButton'

import LabelledControl from '@concrete-form/mui/LabelledControl'

import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'

import { useForm } from 'react-hook-form'

/* specs for the demo form */

const wait = async (delay: number) => await new Promise(resolve => setTimeout(resolve, delay))

const autoCompleteOptions = ['foo', 'bar', 'baz']
const options = [
  { label: <strong>This option has value foo</strong>, value: 'foo' },
  'bar',
  { label: 'Baz !', value: 'baz', props: { disabled: true } },
  'biz',
]
const groupOptions = [
  'foo',
  { group: 'Bar category', options: ['bar.a', 'bar.b', 'bar.c'] },
  { group: <span style={{ color: 'deeppink' }}>Biz category</span>, options: ['biz.a', { label: 'biz.b', value: 'biz.b', props: { disabled: true } }] },
  { label: <strong>Biz</strong>, value: 'baz' },
]
const validateCheckbox = (values: any[]) => values?.length > 0
const validateRadio = (value: any) => value != null

/* ******** */

const LabelledInputDemo: React.FC = () => {
  const configForm = useForm({ defaultValues: { labelPosition: 'left', customTheme: false, labelSize: 4 } })
  const form = useForm({ mode: 'onTouched', criteriaMode: 'all' })

  const { labelPosition, customTheme, labelSize } = configForm.getValues()

  const onSubmit = async (values: any) => {
    await wait(1000)
    console.log(values)
  }

  const getLabelBorderRadius = () => {
    switch (labelPosition as any) {
      case 'left': return '10px 0 0 10px'
      case 'right': return '0 10px 10px 0'
      case 'top': return '10px 10px 0 0'
      case 'bottom': return '0 0 10px 10px'
    }
  }

  const getControlBorderRadius = () => {
    switch (labelPosition as any) {
      case 'left' : return '0 10px 10px 0'
      case 'right' : return '10px 0 0 10px'
      case 'top' : return '0 0 10px 10px'
      case 'bottom' : return '10px 10px 0 0'
    }
  }

  // custom style (similar as the one on storybook)
  const customStyleMain = {
    background: 'rgb(210, 210, 210)',
    padding: 10,
    marginTop: 0,
    marginBottom: 0,
  }
  const customStyleLabel = {
    background: 'rgb(240, 240, 240)',
    borderRadius: getLabelBorderRadius(),
    padding: '22px 25px',
  }
  const customStyleControl = {
    background: '#fff',
    borderRadius: getControlBorderRadius(),
    padding: '15px 20px',
  }

  const defaultLabelledControl = {
    labelPosition,
    mainGridProps: customTheme
      ? {
          style: customStyleMain,
        }
      : undefined,
    labelGridProps: customTheme
      ? {
          sm: labelSize,
          style: customStyleLabel,
        }
      : undefined,
    controlGridProps: customTheme
      ? {
          sm: 12 - labelSize,
          style: customStyleControl,
        }
      : undefined,
  }

  return (
    <Container maxWidth="md">
      <Typography variant="h3" component="h1">Labelled controls demo</Typography>

      <Form form={configForm}>
        <RadioGroup name="labelPosition" options={['left', 'right', 'top', 'bottom']} orientation="horizontal" />
        <ToggleSwitch name="customTheme" label="Use custom theme" />

        { ['left', 'right'].includes(labelPosition) && customTheme && (
          <Slider name="labelSize" label="Label column width" step={1} min={2} max={8} valueLabelDisplay="auto" marks />
        ) }

      </Form>

      <Box my={4}>
        <Divider />
      </Box>

      <Form form={form} onSubmit={onSubmit}>
        <LabelledControl label="ToggleSwitch" {...defaultLabelledControl}>
          <ToggleSwitch name="toggleswitch1" fieldProps={{ required: true }} label="This is the switch label" />
        </LabelledControl>

        <LabelledControl label="Textarea" {...defaultLabelledControl}>
          <Textarea name="textarea1" fieldProps={{ required: true }} label="Textarea" />
        </LabelledControl>

        <LabelledControl label="Slider" {...defaultLabelledControl}>
          <Slider name="slider1" fieldProps={{ min: 25 }} label="label top" labelPosition="top" />
        </LabelledControl>

        <LabelledControl label="SingleCheckbox" {...defaultLabelledControl}>
          <SingleCheckbox name="singlecheckbox1" fieldProps={{ required: true }} label={<>I accept <a href="#rules">the rules</a></>} />
        </LabelledControl>

        <LabelledControl label="Select" {...defaultLabelledControl}>
          <Select name="select1" options={options} fieldProps={{ required: true }} allowEmpty />
        </LabelledControl>

        <LabelledControl label="Radio" {...defaultLabelledControl}>
          <RadioGroup name="radio1" options={options} fieldProps={{ validate: { required: validateRadio } }} />
        </LabelledControl>

        <LabelledControl label="Input" {...defaultLabelledControl}>
          <Input name="input1" label="Standard input" fieldProps={{ required: true }} />
        </LabelledControl>

        <LabelledControl label="FileInput" {...defaultLabelledControl}>
          <FileInput name="fileinput1" />
        </LabelledControl>

        <LabelledControl label="DateTime" {...defaultLabelledControl}>
          <DateTime type="date" name="date" label="Date" fieldProps={{ required: true }} />
        </LabelledControl>

        <LabelledControl label="CustomControl" {...defaultLabelledControl}>
          <CustomControl
            name="customcontrol"
            outgoingDataFormatter={(value?: string) => value?.toLocaleUpperCase()}
            applyLocally
            formatInitialValue
            fieldProps={{ required: true }}
            label="Custom field that capitalized content"
          />
        </LabelledControl>

        <LabelledControl label="Checkbox" {...defaultLabelledControl}>
          <CheckboxGroup name="checkbox1" options={options} fieldProps={{ validate: { required: validateCheckbox } }} />
        </LabelledControl>

        <LabelledControl label="Autocomplete" {...defaultLabelledControl}>
          <Autocomplete name="autocomplete1" textFieldProps={{ label: 'Standard autocomplete' }} options={autoCompleteOptions} fieldProps={{ required: true }} />
        </LabelledControl>

        <Box my={4} display="flex" justifyContent="center">
          <SubmitButton>Submit</SubmitButton>
        </Box>
      </Form>

    </Container>
  )
}

export default LabelledInputDemo
