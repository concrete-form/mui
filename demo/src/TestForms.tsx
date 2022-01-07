/* eslint-disable react/jsx-curly-spacing */
/* eslint-disable @typescript-eslint/no-unused-vars */
import YupTranslator from '@concrete-form/core/YupTranslator'

import ReactHookForm from '@concrete-form/react-hook-form'
import FormikForm from '@concrete-form/formik'

import Autocomplete from '@concrete-form/mui/Autocomplete'
import Input from '@concrete-form/mui/Input'
import CheckboxesGroup from '@concrete-form/mui/CheckboxesGroup'
import CustomControl from '@concrete-form/mui/CustomControl'
import DateTime from '@concrete-form/mui/DateTime'
import FileInput from '@concrete-form/mui/FileInput'
import RadiosGroup from '@concrete-form/mui/RadiosGroup'
import Select from '@concrete-form/mui/Select'
import SingleCheckbox from '@concrete-form/mui/SingleCheckbox'
import Slider from '@concrete-form/mui/Slider'
import Textarea from '@concrete-form/mui/Textarea'
import ToggleSwitch from '@concrete-form/mui/ToggleSwitch'
import SubmitButton from '@concrete-form/mui/SubmitButton'

import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'

import * as Yup from 'yup'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

const isAfterNoon: [string, string, (value?: Date) => boolean] = [
  'is-after-noon',
  'The chosen time must be after noon',
  value => Number(value?.getHours()) >= 12,
]

const hasFile: [string, string, (value?: FileList) => boolean] = [
  'has-file',
  'File is required',
  value => Number(value?.length) > 0,
]

const inRange = (from: number, to: number): [string, string, (values?: number[]) => boolean] => [
  'in-range',
  `stay between ${from} and ${to}`,
  values => Number(values?.[0]) >= from && Number(values?.[1]) <= to,
]

const schema = new YupTranslator(Yup.object({
  autocomplete1: Yup.string().required(),
  autocomplete2: Yup.string().required(),
  autocomplete3: Yup.array().min(1).max(2).required(),
  autocomplete4: Yup.array().of(Yup.string().min(3)).min(1).required(),
  checkbox: Yup.array().min(1).max(2).required(),
  customcontrol: Yup.string().matches(/^[A-Z]*$/).required(),
  date: Yup.date().min(new Date('2021-01-01')).required(),
  time: Yup.date().test(...isAfterNoon).required(),
  datetime: Yup.date().max(new Date('2000-01-01'), 'select a date before 2000').required(),
  // fileinput: Yup.mixed().test(...hasFile).required(),
  input1: Yup.string().required(),
  input2: Yup.number().min(5).max(10).required(),
  input3: Yup.string().min(7).required(),
  input4: Yup.string().email().required(),
  radio: Yup.string().required(),
  select1: Yup.string().required(),
  select2: Yup.array().min(1).max(2).required(),
  select3: Yup.string().required(),
  select4: Yup.array().min(1).max(2).required(),
  singlecheckbox: Yup.boolean().oneOf([true], 'you must accept the rules').required(),
  slider1: Yup.number().min(20).max(80).required(),
  slider2: Yup.array().test(...inRange(20, 80)).required(),
  textarea: Yup.string().min(15).required(),
  toggleswitch: Yup.boolean().oneOf([true], 'this must be enabled').required(),
}))

const wait = async (delay: number) => await new Promise(resolve => setTimeout(resolve, delay))

const emptyValues = {
  autocomplete1: '',
  autocomplete2: '',
  autocomplete3: [],
  autocomplete4: [],
  checkbox: [],
  customcontrol: '',
  date: '',
  time: '',
  datetime: '',
  fileinput: '',
  input1: '',
  input2: '',
  input3: '',
  input4: '',
  radio: '',
  select1: '',
  select2: [],
  select3: '',
  select4: [],
  singlecheckbox: false,
  slider1: 0,
  slider2: [0, 0],
  textarea: '',
  toggleswitch: false,
}

const filledValues = {
  autocomplete1: 'foo',
  autocomplete2: 'custom',
  autocomplete3: ['foo'],
  autocomplete4: ['foo', 'aaa', 'bbb'],
  checkbox: ['foo', 'biz'],
  customcontrol: 'test',
  date: new Date(),
  time: new Date('2021-01-01T18:00:00'),
  datetime: new Date('1999-01-01'),
  input1: 'foo',
  input2: 7,
  input3: 'secret123',
  input4: 'foo@bar.baz',
  radio: 'bar',
  select1: 'foo',
  select2: ['foo', 'bar'],
  select3: 'biz',
  select4: ['foo', 'biz'],
  singlecheckbox: true,
  slider1: 25,
  slider2: [20, 60],
  textarea: 'foo\nbar\nbaz\nbiz',
  toggleswitch: true,
}

// const values = emptyValues
const values = filledValues

/* *** utils for tests ***  */

const autoCompleteOptions = ['foo', 'bar', 'baz']
const options = [
  { label: <strong>foo</strong>, value: 'foo' },
  'bar',
  { label: 'baz', value: 'baz', props: { disabled: true } },
  'biz',
]

const radioOptions = [
  { label: <em>None</em>, value: '' },
  ...options,
]

const nativeOptions = [
  { label: 'foo', value: 'foo', props: { style: { fontWeight: 'bold' } } },
  'bar',
  { label: 'baz', value: 'baz', props: { disabled: true } },
  'biz',
]

const nativeGroupOptions = [
  'foo',
  { group: 'Bar category', options: ['bar.a', 'bar.b', 'bar.c'] },
  { group: 'Biz category', options: ['biz.a', { label: 'biz.b', value: 'biz.b', props: { disabled: true } }] },
  { label: 'Biz', value: 'baz' },
]

/* ********************** */

/* Form content should behave the same with any form handler */
const FormContent: React.FC = () => (
  <>
    <h2>Autocomplete</h2>
    <Autocomplete name="autocomplete1" textFieldProps={{ label: 'Autocomplete' }} options={autoCompleteOptions} />
    <Autocomplete name="autocomplete2" textFieldProps={{ label: 'Autocomplete freeSolo' }} options={autoCompleteOptions} freeSolo />
    <Autocomplete name="autocomplete3" textFieldProps={{ label: 'Multiple' }} options={autoCompleteOptions} multiple />
    <Autocomplete name="autocomplete4" textFieldProps={{ label: 'Multiple freeSolo' }} options={autoCompleteOptions} multiple freeSolo />

    <h2>Checkbox</h2>
    <CheckboxesGroup name="checkbox" options={options} />

    <h2>CustomControl</h2>
    <CustomControl
      name="customcontrol"
      outgoingDataFormatter={(value?: string) => value?.toLocaleUpperCase()}
      applyLocally
      formatInitialValue
    />

    <h2>DateTime</h2>
    <DateTime type="date" name="date" textFieldProps={{ label: 'Date' }} />
    <DateTime type="time" name="time" textFieldProps={{ label: 'Time' }} />
    <DateTime type="datetime" name="datetime" textFieldProps={{ label: 'Date + Time' }} />

    <h2>FileInput</h2>
    <FileInput name="fileinput" />

    <h2>Input</h2>
    <Input name="input1" label="input (text)" />
    <Input name="input2" label="input number" type="number" inputProps={{ min: 5, max: 10 }} />
    <Input name="input3" label="input password" type="password" />
    <Input name="input4" label="input email" type="email" />

    <h2>Radio</h2>
    <RadiosGroup name="radio" options={radioOptions} />

    <h2>Select</h2>
    <Select name="select1" options={options} textFieldProps={{ label: 'Standard' }} allowEmpty />
    <Select name="select2" options={options} textFieldProps={{ label: 'Multiple' }} multiple />
    <Select name="select3" options={nativeOptions} textFieldProps={{ label: 'Native' }} native allowEmpty />
    Multiple + Native:
    <Select name="select4" options={nativeOptions} multiple native />

    <h2>SingleCheckbox</h2>
    <SingleCheckbox name="singlecheckbox" label={<>I accept <a href="#rules">the rules</a></>} />

    <h2>Slider</h2>
    <Slider name="slider1" label="Standard" labelPosition="top" valueLabelDisplay="auto" />
    <Slider name="slider2" label="Range" labelPosition="top" valueLabelDisplay="auto" />

    <h2>Textarea</h2>
    <Textarea name="textarea" label="Textarea" />

    <h2>ToggleSwitch</h2>
    <ToggleSwitch name="toggleswitch" label="ToggleSwitch" />

    <SubmitButton>Submit</SubmitButton>
  </>
)

const InputsDemo: React.FC = () => {
  const form = useForm({
    defaultValues: values,
    // mode: 'onTouched',
    // criteriaMode: 'all',
    resolver: yupResolver(new YupTranslator(schema)),
  })

  const onSubmit = async (values: any) => {
    await wait(1000)
    console.log(values)
  }

  return (
    <Container>
      <Grid container spacing={5}>

        <Grid item xs={6}>
          <h1>React Hook Form</h1>
          <Box
            sx={{
              '& > form > *': { mb: 2 },
            }}
          >
            <ReactHookForm form={form} onSubmit={onSubmit}>
              <FormContent />
            </ReactHookForm>
          </Box>
        </Grid>

        <Grid item xs={6}>
          <h1>Formik</h1>
          <Box
            sx={{
              '& > form > *': { mb: 2 },
            }}
          >
            <FormikForm onSubmit={onSubmit} initialValues={values} formikProps={{ validationSchema: schema }}>
              <FormContent />
            </FormikForm>
          </Box>
        </Grid>

      </Grid>
    </Container>
  )
}

export default InputsDemo
