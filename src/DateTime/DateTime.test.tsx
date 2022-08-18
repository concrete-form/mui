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

  // disabled test since it's broken on AppVeyor (different default locale settings ?)
  xit('submits date', async () => {
    const onSubmit = jest.fn()
    render(
      <><DateTime name="test" /><button type="submit">submit</button></>,
      { formValues: { test: new Date('2000-01-02T00:00:00') }, onSubmit },
    )
    const input = screen.getByRole('textbox')
    await userEvent.click(input)
    await userEvent.click(screen.getByRole('button', { name: 'Jan 15, 2000' }))
    await userEvent.click(screen.getByRole('button', { name: 'OK' }))

    await userEvent.click(await screen.findByRole('button', { name: 'submit' }))

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({ test: new Date('2000-01-15T00:00:00.000') }, expect.anything())
    })
  })

  it('submits time', async () => {
    const onSubmit = jest.fn()
    render(
      <><DateTime type="time" name="test" /><button type="submit">submit</button></>,
      { formValues: { test: new Date('2000-01-02T00:00:00') }, onSubmit },
    )
    const input = screen.getByRole('textbox')
    await userEvent.click(input)
    await userEvent.click(screen.getByRole('button', { name: 'clock view is open, go to text input view' }))
    const timeField = screen.getByRole('textbox')

    await userEvent.click(timeField)
    await userEvent.clear(timeField)
    await userEvent.type(timeField, '12:34 pm')
    await userEvent.click(screen.getByRole('button', { name: 'OK' }))
    await userEvent.click(await screen.findByRole('button', { name: 'submit' }))

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({ test: new Date('2000-01-02T12:34:00.000') }, expect.anything())
    })
  })

  it('ignores invalid time', async () => {
    const onSubmit = jest.fn()
    render(
      <><DateTime type="time" name="test" /><button type="submit">submit</button></>,
      { formValues: { test: new Date('2000-01-02T00:00:00') }, onSubmit },
    )
    const input = screen.getByRole('textbox')
    await userEvent.click(input)
    await userEvent.click(screen.getByRole('button', { name: 'clock view is open, go to text input view' }))
    const timeField = screen.getByRole('textbox')

    await userEvent.click(timeField)
    await userEvent.clear(timeField)
    await userEvent.type(timeField, '99:99 pm')
    await userEvent.click(screen.getByRole('button', { name: 'OK' }))
    await userEvent.click(await screen.findByRole('button', { name: 'submit' }))

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({ test: new Date('2000-01-02T00:00:00.000') }, expect.anything())
    })
  })

  it('handle validation error', async () => {
    render(<DateTime name="test" fieldProps={{ required: 'testing errors' }} />)
    const input = screen.getByRole('textbox')
    expect(input).toBeValid()
    await userEvent.click(input)
    await userEvent.click(document.body)
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
