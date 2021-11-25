import render from '../testkit/render'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Autocomplete from './Autocomplete'

const options = ['foo', 'bar', 'baz']

describe('Autocomplete', () => {
  it('render name prop', () => {
    render(<Autocomplete name="test" options={options} />)
    expect(screen.getByRole('textbox')).toHaveAttribute('name', 'test')
  })

  it('render id prop', () => {
    render(<Autocomplete name="test" options={options} />)
    expect(screen.getByRole('textbox')).toHaveAttribute('id')
  })

  it('render input as required', () => {
    render(<Autocomplete name="test" options={options} textFieldProps={{ required: true }} />)
    const input = screen.getByRole('textbox')
    expect(input).toBeRequired()
  })

  it('render props to the input (with inputProps)', () => {
    render(<Autocomplete name="test" options={options} textFieldProps={{ inputProps: { 'data-test': 'foo' } }} />)
    expect(screen.getByRole('textbox').dataset.test).toBe('foo')
  })

  it('render initial value', () => {
    render(<Autocomplete name="test" options={options} />, { formValues: { test: 'foo' } })
    expect(screen.getByRole('textbox')).toHaveDisplayValue('foo')
  })

  it('render new value when changed', () => {
    render(<Autocomplete name="test" options={options} />)
    const input = screen.getByRole('textbox')
    userEvent.type(input, 'bar')
    expect(input).toHaveDisplayValue('bar')
  })

  it('call onChange callback', async () => {
    const callback = jest.fn()
    render(<Autocomplete name="test" options={options} onChange={callback} />)
    userEvent.type(screen.getByRole('textbox'), 'baz')
    userEvent.click(screen.getByRole('option', { name: 'baz' }))

    userEvent.click(document.body)
    await waitFor(() => {
      expect(callback).toHaveBeenCalled()
    })
  })

  it('call onBlur callback', async () => {
    const callback = jest.fn()
    render(<Autocomplete name="test" options={options} onBlur={callback} />)
    userEvent.click(screen.getByRole('textbox'))
    userEvent.click(document.body)
    await waitFor(() => {
      expect(callback).toHaveBeenCalled()
    })
  })

  it('save data on the form', async () => {
    const onSubmit = jest.fn()
    render(<><Autocomplete name="test" options={options} /><button type="submit">submit</button></>, { onSubmit })
    const input = screen.getByRole('textbox')

    userEvent.type(input, 'baz{arrowdown}{enter}')

    userEvent.click(screen.getByRole('button', { name: 'submit' }))
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({ test: 'baz' }, expect.anything())
    })
  })

  it('handle validation error', async () => {
    render(<Autocomplete name="test" options={options} fieldProps={{ required: 'testing errors' }} />)
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
      render(<Autocomplete name="test" options={options} textFieldProps={{ label: 'foo' }} />)
      expect(screen.getByLabelText('foo')).toBeInTheDocument()
    })

    it('send an empty string when resetting the field', async () => {
      const onSubmit = jest.fn()
      render(<><Autocomplete name="test" options={options} /><button type="submit">submit</button></>, { onSubmit })
      const input = screen.getByRole('textbox')

      userEvent.type(input, 'baz{arrowdown}{enter}')
      userEvent.click(document.body)
      userEvent.hover(input)

      userEvent.click(await screen.findByLabelText('Clear'))

      userEvent.click(screen.getByRole('button', { name: 'submit' }))
      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledWith({ test: '' }, expect.anything())
      })
    })
  })
})
