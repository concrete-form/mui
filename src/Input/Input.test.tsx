import render from '../testkit/render'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Input from './Input'

describe('Input', () => {
  it('render name prop', () => {
    render(<Input name="test" />)
    expect(screen.getByRole('textbox')).toHaveAttribute('name', 'test')
  })

  it('render id prop', () => {
    render(<Input name="test" />)
    expect(screen.getByRole('textbox')).toHaveAttribute('id')
  })

  it('render input as required', () => {
    render(<Input name="test" required />)
    expect(screen.getByRole('textbox')).toBeRequired()
  })

  it('render props to the input (with inputProps)', () => {
    render(<Input name="test" inputProps={{ 'data-test': 'foo' }} />)
    expect(screen.getByRole('textbox').dataset.test).toBe('foo')
  })

  it('render initial value', () => {
    render(<Input name="test" />, { formValues: { test: 'foo' } })
    expect(screen.getByRole('textbox')).toHaveDisplayValue('foo')
  })

  it('render new value when changed', () => {
    render(<Input name="test" />)
    const input = screen.getByRole('textbox')
    userEvent.type(input, 'bar')
    expect(input).toHaveDisplayValue('bar')
  })

  it('call onChange callback', () => {
    const callback = jest.fn()
    render(<Input name="test" onChange={callback} />)
    userEvent.type(screen.getByRole('textbox'), 'foo')
    expect(callback).toHaveBeenCalledTimes(3)
  })

  it('call onBlur callback', () => {
    const callback = jest.fn()
    render(<Input name="test" onBlur={callback} />)
    userEvent.click(screen.getByRole('textbox'))
    userEvent.click(document.body)
    expect(callback).toHaveBeenCalledTimes(1)
  })

  it('save data on the form', async () => {
    const onSubmit = jest.fn()
    render(<><Input name="test" /><button type="submit">submit</button></>, { onSubmit })
    userEvent.type(screen.getByRole('textbox'), 'baz')
    userEvent.click(screen.getByRole('button', { name: 'submit' }))
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({ test: 'baz' }, expect.anything())
    })
  })

  it('handle validation error', async () => {
    render(<Input name="test" fieldProps={{ required: 'testing errors' }} />)
    const input = screen.getByRole('textbox')
    expect(input).toBeValid()
    userEvent.click(input)
    userEvent.click(document.body)
    await waitFor(() => {
      expect(input).toBeInvalid()
    })
    expect(screen.getByText('testing errors')).toBeInTheDocument()
  })

  describe('Mui props', () => {
    it('forward props to the Textfield', () => {
      render(<Input name="test" label="foo" />)
      expect(screen.getByLabelText('foo')).toBeInTheDocument()
    })
  })
})
