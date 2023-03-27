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
    render(<DateTime name="test" slotProps={{ textField: { required: true } }} />)
    const input = screen.getByRole('textbox')
    expect(input).toBeRequired()
  })

  it('render initial value', () => {
    render(<DateTime name="test" />, { formValues: { test: new Date('2000-01-02T00:00:00') } })
    const textbox: any = screen.getByRole('textbox')
    const value = textbox.value.replace(/[\u2066-\u2068-\u2069 ]/g, '')
    expect(value).toBe('01/02/2000')
  })

  it('submits date', async () => {
    const onSubmit = jest.fn()
    render(
      <><DateTime name="test" /><button type="submit">submit</button></>,
      { formValues: { test: new Date('2000-01-02T00:00:00') }, onSubmit },
    )
    const input = screen.getByRole('textbox')
    await userEvent.click(input)

    await userEvent.type(input, '1990')
    await userEvent.click(await screen.findByRole('button', { name: 'submit' }))

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({ test: new Date('1990-01-02T00:00:00.000') }, expect.anything())
    })
  })

  it('submits time', async () => {
    const onSubmit = jest.fn()
    render(
      <><DateTime type="time" name="test" /><button type="submit">submit</button></>,
      { formValues: { test: new Date('2000-01-02T00:00:00') }, onSubmit },
    )
    const input = screen.getByRole('textbox')
    // await userEvent.click(input)

    await userEvent.type(input, '{arrowleft}{arrowup}')
    await userEvent.type(input, '{arrowup}')

    await userEvent.click(await screen.findByRole('button', { name: 'submit' }))

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({ test: new Date('2000-01-02T12:01:00.000') }, expect.anything())
    })
  })

  it('handle validation error', async () => {
    render(
      <><DateTime name="test" fieldProps={{ required: 'testing errors' }} /><button type="submit">submit</button></>,
      { onSubmit: jest.fn() },
    )
    const input = screen.getByRole('textbox')
    expect(input).toBeValid()

    await userEvent.click(await screen.findByRole('button', { name: 'submit' }))

    expect(input).toBeInvalid()
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
    it('forward props to the DatePicker', () => {
      render(<DateTime name="test" label="foo" />)
      expect(screen.getByLabelText('foo')).toBeInTheDocument()
    })
  })
})
