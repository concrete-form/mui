import render from '../testkit/render'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import DateTime from './DateTime'

describe('DateTime', () => {
  it('render name prop', () => {
    render(<DateTime name="test" />)
    expect(screen.getByRole('textbox')).toHaveAttribute('name', 'test')
  })

  it('render id prop', () => {
    render(<DateTime name="test" />)
    expect(screen.getByRole('textbox')).toHaveAttribute('id')
  })

  it('render input as required', () => {
    render(<DateTime name="test" textFieldProps={{ required: true }} />)
    const input = screen.getByRole('textbox')
    expect(input).toBeRequired()
  })

  it('render initial value', () => {
    render(<DateTime name="test" />, { formValues: { test: new Date('2000-01-02T00:00:00') } })
    expect(screen.getByRole('textbox')).toHaveDisplayValue('01/02/2000')
  })

  // todo: find a way to simulate date change
  it.todo('save data on the form')

  it('handle validation error', async () => {
    render(<DateTime name="test" fieldProps={{ required: 'testing errors' }} />)
    const input = screen.getByRole('textbox')
    expect(input).toBeValid()
    userEvent.click(input)
    userEvent.click(document.body)
    await waitFor(() => {
      expect(input).toBeInvalid()
    })
    expect(screen.getByText('testing errors')).toBeInTheDocument()
  })

  it('render "date" input by default', () => {
    render(<DateTime name="test" />)
    expect(screen.getByTestId('concrete-form:date')).toBeInTheDocument()
  })

  it('render "time" input', () => {
    render(<DateTime name="test" type="time" />)
    expect(screen.getByTestId('concrete-form:time')).toBeInTheDocument()
  })

  it('render "date" input', () => {
    render(<DateTime name="test" type="date" />)
    expect(screen.getByTestId('concrete-form:date')).toBeInTheDocument()
  })

  it('render "datetime" input', () => {
    render(<DateTime name="test" type="datetime" />)
    expect(screen.getByTestId('concrete-form:datetime')).toBeInTheDocument()
  })

  describe('Mui props', () => {
    it('forward props to the Textfield', () => {
      render(<DateTime name="test" textFieldProps={{ placeholder: 'foo' }} />)
      expect(screen.getByPlaceholderText('foo')).toBeInTheDocument()
    })

    it('render "date" input by default', () => {
      render(<DateTime name="test" />)
      expect(screen.getByTestId('concrete-form:date')).toBeInTheDocument()
    })
  })
})
