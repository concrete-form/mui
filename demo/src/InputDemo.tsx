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

import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import FavoriteBorder from '@mui/icons-material/FavoriteBorder'
import Favorite from '@mui/icons-material/Favorite'

import { useForm } from 'react-hook-form'

const wait = async (delay: number) => await new Promise(resolve => setTimeout(resolve, delay))

type DemoFormProps = {
  children: React.ReactNode
  defaultValues?: Record<string, any>
  dynamicChanges?: Record<string, any>
}

const DemoForm: React.FC<DemoFormProps> = ({ children, defaultValues, dynamicChanges }) => {
  const form = useForm({
    defaultValues,
    mode: 'onTouched',
    criteriaMode: 'all',
  })

  const [debugValues, setDebugValues] = useState<any>()

  const onSubmit = async (values: any) => {
    await wait(1000)
    setDebugValues(values)
  }

  const handleDynamicChanges = () => {
    if (!dynamicChanges) {
      return
    }
    Object.entries(dynamicChanges).forEach(([key, value]) => {
      form.setValue(key, value, { shouldValidate: true })
    })
  }

  return (
    <Form form={form} onSubmit={onSubmit}>
      {children}
      { dynamicChanges && <Button variant="outlined" onClick={handleDynamicChanges}>Dynamic changes</Button> }
      {' '}
      <SubmitButton>Submit</SubmitButton>
      {debugValues && (
        <>
          <hr />
          <pre>
            { JSON.stringify(debugValues, undefined, 2) }
          </pre>
        </>
      )}
    </Form>
  )
}

const DemoAutoComplete: React.FC = () => {
  const autoCompleteOptions = ['foo', 'bar', 'baz']

  const defaultValues = {
    prefilled: autoCompleteOptions[1],
    multiple: [],
  }

  const dynamicChanges = {
    prefilled: autoCompleteOptions[0],
    required: autoCompleteOptions[1],
    freesolo: 'custom',
    multiple: autoCompleteOptions.slice(1),
  }

  return (
    <DemoForm defaultValues={defaultValues} dynamicChanges={dynamicChanges}>
      <Autocomplete name="prefilled" textFieldProps={{ label: 'Prefilled' }} options={autoCompleteOptions} />
      <Autocomplete name="required" textFieldProps={{ label: 'Required' }} options={autoCompleteOptions} fieldProps={{ required: true }} />
      <Autocomplete freeSolo name="freesolo" textFieldProps={{ label: 'Freesolo' }} options={autoCompleteOptions} />
      <Autocomplete multiple name="multiple" textFieldProps={{ label: 'Multiple' }} options={autoCompleteOptions} />
    </DemoForm>
  )
}

const DemoCheckbox: React.FC = () => {
  const options = [
    { label: <strong>Foooooooooooooooooo</strong>, value: 'foo' },
    'bar',
    { label: 'Baz !', value: 'baz', props: { disabled: true } },
    'biz',
  ]
  const validateCheckbox = (values: any[]) => values?.length > 0

  const defaultValues = {
    prefilled: ['foo', 'biz'],
  }

  const dynamicChanges = {
    prefilled: ['bar', 'biz'],
    required: ['foo', 'bar', 'biz'],
    custom: [],
  }

  return (
    <DemoForm defaultValues={defaultValues} dynamicChanges={dynamicChanges}>
      <CheckboxGroup name="prefilled" options={options} />
      <CheckboxGroup name="required" options={options} fieldProps={{ validate: { required: validateCheckbox } }} />
      <CheckboxGroup name="custom" options={['foo', 'bar']} orientation="horizontal" labelPosition="top" icon={<FavoriteBorder />} checkedIcon={<Favorite />} />
    </DemoForm>
  )
}

const DemoCustomControl: React.FC = () => {
  const defaultValues = {
    prefilled: 'demo text',
  }

  const dynamicChanges = {
    prefilled: 'new value',
    required: 'another new value',
  }

  return (
    <DemoForm defaultValues={defaultValues} dynamicChanges={dynamicChanges}>
      <h2>CustomControl</h2>
      <CustomControl
        name="prefilled"
        outgoingDataFormatter={(value?: string) => value?.toLocaleUpperCase()}
        applyLocally
        formatInitialValue
      />
      <CustomControl
        name="required"
        outgoingDataFormatter={(value?: string) => value?.toLocaleUpperCase()}
        formatInitialValue
        fieldProps={{ required: true }}
      />
    </DemoForm>
  )
}

const DemoDateTime: React.FC = () => {
  const defaultValues = {
    // date: new Date(),
    time: new Date(),
    datetime: new Date(),
  }

  return (
    <DemoForm defaultValues={defaultValues} dynamicChanges={defaultValues}>
      <DateTime type="date" name="date" label="Date" fieldProps={{ required: true }} />
      <DateTime type="time" name="time" label="Time" fieldProps={{ required: true }} />
      <DateTime type="datetime" name="datetime" label="Date + Time" fieldProps={{ required: true }} />
    </DemoForm>
  )
}

const DemoInput: React.FC = () => {
  const defaultValues = {
    prefilled: 'Foo',
    number: 123,
  }

  return (
    <DemoForm defaultValues={defaultValues} dynamicChanges={defaultValues}>
      <Input name="prefilled" label="Prefilled" />
      <Input name="required" label="Required" fieldProps={{ required: true }} />
      <Input name="number" type="number" label="Input number" />
    </DemoForm>
  )
}

const InputsDemo: React.FC = () => {
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          '& > form > *': { my: 2 },
        }}
      >

        {/* <DemoAutoComplete /> */}
        {/* <DemoCheckbox /> */}
        {/* <DemoCustomControl /> */}

        <DemoDateTime />

        {/* <DemoInput /> */}

      </Box>
    </Container>
  )
}

export default InputsDemo
