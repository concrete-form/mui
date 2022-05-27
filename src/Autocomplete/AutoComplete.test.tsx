import render from '../testkit/render'
import { screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Autocomplete from './Autocomplete'

const options = ['foo', 'bar', 'baz']

describe('Autocomplete', () => {
  it('render name prop', () => {
    render(<Autocomplete name="test" options={options} />)
    expect(screen.getByRole('combobox')).toHaveAttribute('name', 'test')
  })

  it('render id prop', () => {
    render(<Autocomplete name="test" options={options} />)
    expect(screen.getByRole('combobox')).toHaveAttribute('id')
  })

  it('render input as required', () => {
    render(<Autocomplete name="test" options={options} textFieldProps={{ required: true }} />)
    const input = screen.getByRole('combobox')
    expect(input).toBeRequired()
  })

  it('render props to the input (with inputProps)', () => {
    render(<Autocomplete name="test" options={options} textFieldProps={{ inputProps: { 'data-test': 'foo' } }} />)
    expect(screen.getByRole('combobox').dataset.test).toBe('foo')
  })

  it('render initial value', () => {
    render(<Autocomplete name="test" options={options} />, { formValues: { test: 'foo' } })
    expect(screen.getByRole('combobox')).toHaveDisplayValue('foo')
  })

  it('render new value when changed', async () => {
    render(<Autocomplete name="test" options={options} />, { formValues: { test: '' } })
    const input = screen.getByRole('combobox')
    await userEvent.type(input, 'bar')
    expect(input).toHaveDisplayValue('bar')
  })

  it('call onChange callback', async () => {
    const onChange = jest.fn()
    render(<Autocomplete name="test" options={options} onChange={onChange} />)
    await userEvent.type(screen.getByRole('combobox'), 'baz')
    await userEvent.click(screen.getByRole('option', { name: 'baz' }))

    await userEvent.click(document.body)
    await waitFor(() => {
      expect(onChange).toHaveBeenCalled()
    })
  })

  it('prevent value change when onChange event.preventDefault() is called', async () => {
    const onChange = jest.fn((event: React.SyntheticEvent<Element, Event>) => {
      event.preventDefault()
    })
    const onSubmit = jest.fn()
    render((
      <>
        <Autocomplete name="test" options={options} onChange={onChange} />
        <button type="submit">submit</button>
      </>
    ), {
      onSubmit,
      formValues: { test: 'foo' },
    })
    const input = screen.getByRole('combobox')

    await userEvent.type(input, 'baz{arrowdown}{enter}')

    await userEvent.click(screen.getByRole('button', { name: 'submit' }))
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({ test: 'foo' }, expect.anything())
    })
  })

  it('call onBlur callback', async () => {
    const callback = jest.fn()
    render(<Autocomplete name="test" options={options} onBlur={callback} />)
    await userEvent.click(screen.getByRole('combobox'))
    await userEvent.click(document.body)
    await waitFor(() => {
      expect(callback).toHaveBeenCalled()
    })
  })

  it('save data on the form when an option is selected', async () => {
    const onSubmit = jest.fn()
    render(<><Autocomplete name="test" options={options} /><button type="submit">submit</button></>, { onSubmit })
    const input = screen.getByRole('combobox')

    await userEvent.type(input, 'baz{arrowdown}{enter}')

    await userEvent.click(screen.getByRole('button', { name: 'submit' }))
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({ test: 'baz' }, expect.anything())
    })
  })

  it('save data on the form when a value is type with freeSolo enabled', async () => {
    const onSubmit = jest.fn()
    render(<><Autocomplete name="test" options={options} freeSolo /><button type="submit">submit</button></>, { onSubmit })
    const input = screen.getByRole('combobox')

    await userEvent.type(input, 'Hello')

    await userEvent.click(screen.getByRole('button', { name: 'submit' }))
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({ test: 'Hello' }, expect.anything())
    })
  })

  it('handles multiple values', async () => {
    const onSubmit = jest.fn()
    render((
      <>
        <Autocomplete name="test" options={options} multiple freeSolo />
        <button type="submit">submit</button>
      </>
    ), {
      onSubmit,
      formValues: { test: ['foo', 'a', 'b'] },
    })
    const input = screen.getByRole('combobox')
    // removing option "a"
    const optionA = screen.getByRole('button', { name: 'a' })
    await userEvent.click(within(optionA).getByTestId('CancelIcon'))
    // creating option "c"
    await userEvent.type(input, 'c{enter}')
    await userEvent.click(screen.getByRole('button', { name: 'submit' }))
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({ test: ['foo', 'b', 'c'] }, expect.anything())
    })
  })

  it('handle validation error', async () => {
    render(<Autocomplete name="test" options={options} fieldProps={{ required: 'testing errors' }} />)
    const input = screen.getByRole('combobox')
    expect(input).toBeValid()
    await userEvent.click(input)
    await userEvent.click(document.body)

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

    it('value is empty string when clearing the field', async () => {
      const onSubmit = jest.fn()
      render((
        <>
          <Autocomplete name="test" options={options} />
          <button type="submit">submit</button>
        </>
      ), { onSubmit, formValues: { test: 'foo' } })
      const input = screen.getByRole('combobox')
      await userEvent.hover(input)
      await userEvent.click(await screen.findByLabelText('Clear'))
      await userEvent.click(screen.getByRole('button', { name: 'submit' }))
      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledWith({ test: '' }, expect.anything())
      })
    })

    it('value is empty array when clearing the field with multiple=true', async () => {
      const onSubmit = jest.fn()
      render((
        <>
          <Autocomplete name="test" options={options} multiple />
          <button type="submit">submit</button>
        </>
      ), { onSubmit, formValues: { test: ['foo'] } })
      const input = screen.getByRole('combobox')
      await userEvent.hover(input)
      await userEvent.click(await screen.findByLabelText('Clear'))
      await userEvent.click(screen.getByRole('button', { name: 'submit' }))
      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledWith({ test: [] }, expect.anything())
      })
    })

    it('ignores invalid input', async () => {
      const onSubmit = jest.fn()
      render(<><Autocomplete name="test" options={options} /><button type="submit">submit</button></>, { onSubmit })
      const input = screen.getByRole('combobox')

      await userEvent.type(input, 'invalid data')

      await userEvent.click(screen.getByRole('button', { name: 'submit' }))
      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledWith({ test: undefined }, expect.anything())
      })
    })
  })
})
