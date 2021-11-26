/* eslint-disable react/jsx-curly-spacing */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Form from '@concrete-form/react-hook-form'
import LabelledControl from '@concrete-form/mui/LabelledControl'
import Input from '@concrete-form/mui/Input'
import Checkbox from '@concrete-form/mui/Checkbox'

import { useForm } from 'react-hook-form'

import Container from '@mui/material/Container'
import Box from '@mui/material/Box'

import layout from './customLayout'

const LayoutDemo: React.FC = () => {
  const form = useForm({ mode: 'onTouched' })

  return (
    <Container maxWidth="md">

      <Form
        form={form}
        layout={layout}
      >
        <Box my={15}>
          <LabelledControl label="Label">
            <Input name="test" fieldProps={{ required: 'Error message' }} />
          </LabelledControl>
        </Box>

        <Box my={15}>
          <LabelledControl label="Label">
            <Checkbox name="test2" options={['Foo', 'bar', { label: 'Baz', value: 'Baz', props: { disabled: true } }]} fieldProps={{ required: 'Error message' }} />
          </LabelledControl>
        </Box>
      </Form>

    </Container>
  )
}

export default LayoutDemo
