/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect } from 'react'
import { useForm, useFormContext, useWatch } from 'react-hook-form'
import Form from '@concrete-form/react-hook-form'

import Autocomplete from '@concrete-form/mui/Autocomplete'
import CheckboxesGroup from '@concrete-form/mui/CheckboxesGroup'
import DateTime from '@concrete-form/mui/DateTime'
import Input from '@concrete-form/mui/Input'
import RadiosGroup from '@concrete-form/mui/RadiosGroup'
import Select from '@concrete-form/mui/Select'
import SingleCheckbox from '@concrete-form/mui/SingleCheckbox'
import Slider from '@concrete-form/mui/Slider'
import Textarea from '@concrete-form/mui/Textarea'
import ToggleSwitch from '@concrete-form/mui/ToggleSwitch'

const Content: React.FC = () => {
  const formContext = useFormContext()
  const data = useWatch()

  useEffect(() => {
    const timeout = setTimeout(() => {
      formContext.setValue('text', 'baz')
      // formContext.setValue('array', ['bar', 'baz'])
      // formContext.setValue('date', new Date())
      // formContext.setValue('bool', true)
      // formContext.setValue('number', 75)
    }, 5000)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <>
      <Autocomplete
        freeSolo
        name="text"
        options={[
          'foo',
          'bar',
          'baz',
        ]}
      />
      { /* <Input name="text" /> */ }
      { /* <CheckboxesGroup
        name="array"
        options={[
          'foo',
          'bar',
          'baz',
        ]}
      /> */ }
      { /* <DateTime name="date" /> */ }
      { /* <RadiosGroup
        name="text"
        options={[
          'foo',
          'bar',
          'baz',
        ]}
      /> */ }
      { /* <Select name="text" options={['foo', 'bar', 'baz']} /> */ }
      { /* <SingleCheckbox name="bool" /> */ }
      { /* <Slider name="number" /> */ }
      { /* <Textarea name="text" /> */ }
      { /* <ToggleSwitch name="bool" /> */ }

      <pre>
        { JSON.stringify(data, undefined, 2) }
      </pre>
    </>
  )
}

const TestProg: React.FC = () => {
  const form = useForm({
    defaultValues: {
      text: 'bar',
      array: ['foo', 'bar'],
      date: new Date('1970-01-01 00:00:00'),
      bool: false,
      number: 20,
    },
  })

  return (
    <Form form={form}>
      <Content />
    </Form>
  )
}

export default TestProg
