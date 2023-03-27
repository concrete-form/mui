/* eslint-disable react/jsx-curly-spacing */
/* eslint-disable @typescript-eslint/no-unused-vars */
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
import FavoriteBorder from '@mui/icons-material/FavoriteBorder'
import Favorite from '@mui/icons-material/Favorite'

import { useForm } from 'react-hook-form'

const wait = async (delay: number) => await new Promise(resolve => setTimeout(resolve, delay))

const values = {
  // autocomplete1: 'bar',
  // autocomplete2: 'something else',
  // input1: 'foo',
  // input2: 'bar',
  // input3: 123,
  // checkbox1: ['foo', 'biz'],
  // customcontrol: 'I\'m aLl UppeRCaSe !',
  date: new Date(),
  time: new Date(),
  datetime: new Date(),
  // radio1: 'bar',
  // radio2: 'biz',
  // select1: 'bar',
  // select2: ['foo', 'bar.b'],
  // select3: 'bar',
  // select4: ['foo', 'bar.b'],
  // singlecheckbox1: true,
  // singlecheckbox2: false,
  // slider1: 75,
  // slider2: [30, 60],
  // textarea1: 'foo\nbar\nbaz\nbiz',
  // toggleswitch1: true,
  // toggleswitch2: false,
}

const autoCompleteOptions = ['foo', 'bar', 'baz']
const options = [
  { label: <strong>Foooooooooooooooooo</strong>, value: 'foo' },
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

const nativeOptions = [
  { label: 'foo', value: 'foo' },
  'bar',
  { label: 'Baz !', value: 'baz', props: { disabled: true } },
  'biz',
]

const nativeGroupOptions = [
  'foo',
  { group: 'Bar category', options: ['bar.a', 'bar.b', 'bar.c'] },
  { group: 'Biz category', options: ['biz.a', { label: 'biz.b', value: 'biz.b', props: { disabled: true } }] },
  { label: 'Biz', value: 'baz' },
]

const validateCheckbox = (values: any[]) => values?.length > 0
const validateRadio = (value: any) => value != null
const validateSliderRange = ([min, max]: [number, number]) => min < 30 || max > 130 ? 'stay between 30 and 130' : true

const InputsDemo: React.FC = () => {
  const form = useForm({ defaultValues: values, mode: 'onTouched', criteriaMode: 'all' })

  const onSubmit = async (values: any) => {
    await wait(1000)
    console.log(values)
  }

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          '& > form > *': { mb: 2 },
        }}
      >
        <Form form={form} onSubmit={onSubmit}>

          {/* <h2>ToggleSwitch</h2>
          <ToggleSwitch name="toggleswitch1" fieldProps={{ required: true }} label="top top top top top" labelPosition="top" />
          <ToggleSwitch name="toggleswitch2" label="bottom bottom bottom bottom bottom" labelPosition="bottom" />
          <ToggleSwitch name="toggleswitch3" label="left left left left left" labelPosition="left" />
          <ToggleSwitch name="toggleswitch4" label="right right right right right" labelPosition="right" applyInitialValue />

          <h2>Textarea</h2>
          <Textarea name="textarea1" fieldProps={{ required: true }} label="Textarea" />

          <h2>Slider</h2>
          <Slider name="slider1" fieldProps={{ min: 25 }} label="label top" labelPosition="top" />
          <Slider name="slider2" fieldProps={{ validate: validateSliderRange }} label="label bottom" labelPosition="bottom" orientation="vertical" height={200} valueLabelDisplay="auto" step={10} max={200} marks />

          <h2>SingleCheckbox</h2>
          <SingleCheckbox name="singlecheckbox1" fieldProps={{ required: true }} label={<>I accept <a href="#rules">the rules</a></>} />
          <SingleCheckbox name="singlecheckbox2" label={<>I accept <a href="#rules">the rules</a></>} labelPosition="left" />
          <SingleCheckbox name="singlecheckbox3" label={<>I accept <a href="#rules">the rules</a></>} labelPosition="top" />
          <SingleCheckbox name="singlecheckbox4" label={<>I accept <a href="#rules">the rules</a></>} labelPosition="bottom" />

          <h2>Select</h2>
          <Select name="select1" options={options} fieldProps={{ required: true }} allowEmpty />
          <Select name="select2" options={groupOptions} fieldProps={{ required: true }} multiple />

          <Select name="select3" options={nativeOptions} fieldProps={{ required: true }} allowEmpty native />
          <Select name="select4" options={nativeGroupOptions} fieldProps={{ required: true }} multiple native />

          <h2>Radio</h2>
          <RadioGroup name="radio1" options={options} fieldProps={{ validate: { required: validateRadio } }} />
          <RadioGroup name="radio2" options={options} orientation="horizontal" labelPosition="top" icon={<FavoriteBorder />} checkedIcon={<Favorite />} fieldProps={{ validate: { required: validateRadio } }} />

          <h2>Input</h2>
          <Input name="input1" label="Standard input" fieldProps={{ required: true }} />
          <Input name="input2" label="Input without fullWidth" fullWidth={false} />
          <Input name="input3" type="number" label="Input number" />

          <h2>FileInput</h2>
          <FileInput name="fileinput1" /> */}

          <h2>DateTime</h2>
          <DateTime type="date" name="date" label="Date" fieldProps={{ required: true }} />
          <DateTime type="time" name="time" label="Time" fieldProps={{ required: true }} />
          <DateTime type="datetime" name="datetime" label="Date + Time" fieldProps={{ required: true }} />

          {/* <h2>CustomControl</h2>
          <CustomControl
            name="customcontrol"
            outgoingDataFormatter={(value?: string) => value?.toLocaleUpperCase()}
            applyLocally
            formatInitialValue
            fieldProps={{ required: true }}
          />

          <h2>Checkbox</h2>
          <CheckboxGroup name="checkbox1" options={options} fieldProps={{ validate: { required: validateCheckbox } }} />
          <CheckboxGroup name="checkbox2" options={['foo', 'bar']} orientation="horizontal" labelPosition="top" icon={<FavoriteBorder />} checkedIcon={<Favorite />} />

          <h2>Autocomplete</h2>
          <Autocomplete name="autocomplete1" textFieldProps={{ label: 'Standard autocomplete' }} options={autoCompleteOptions} fieldProps={{ required: true }} />
          <Autocomplete freeSolo name="autocomplete2" textFieldProps={{ label: 'Freesolo autocomplete' }} options={autoCompleteOptions} />
          <Autocomplete name="autocomplete3" textFieldProps={{ label: 'Empty autocomplete' }} options={autoCompleteOptions} /> */}

          <SubmitButton>Submit</SubmitButton>
        </Form>
      </Box>
    </Container>
  )
}

export default InputsDemo
