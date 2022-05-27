import render from '../testkit/render'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CustomControl from './CustomControl'

describe('CustomControl', () => {
  it('render "input" component by default', () => {
    render(<CustomControl name="test" />)
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('render all props to the input', () => {
    render(<CustomControl name="test" data-testid="foo" />)
    expect(screen.getByTestId('foo')).toBeInTheDocument()
  })

  it('render any component using "render" prop', () => {
    render(<CustomControl name="test" render={(props) => <select {...props} />} />)
    expect(screen.getByRole('combobox')).toBeInTheDocument()
  })

  it('uses formatters', async () => {
    const onSubmit = jest.fn()
    const incomingDataFormatter = (value?: string[]) => value?.join('')
    const outgoingDataFormatter = (value: string) => value.split('')
    render(
      (
        <>
          <CustomControl name="test" incomingDataFormatter={incomingDataFormatter} outgoingDataFormatter={outgoingDataFormatter} />
          <button type="submit">submit</button>
        </>
      ),
      { formValues: { test: ['f', 'o', 'o'] }, onSubmit },
    )
    const input = screen.getByRole('textbox')
    expect(input).toHaveDisplayValue('foo')
    await userEvent.clear(input)
    await userEvent.type(input, 'bar')
    expect(input).toHaveDisplayValue('bar')
    await userEvent.click(screen.getByRole('button', { name: 'submit' }))

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        test: ['b', 'a', 'r'],
      }, expect.anything())
    })
  })

  it('apply changes locally', async () => {
    const formatter = (value?: string) => value?.toLocaleUpperCase()
    render(<CustomControl name="test" outgoingDataFormatter={formatter} applyLocally />)
    const input = screen.getByRole('textbox')
    await userEvent.type(input, 'foo')

    await waitFor(() => {
      expect(input).toHaveDisplayValue('FOO')
    })
  })

  it('format initial data', async () => {
    const onSubmit = jest.fn()
    const formatter = (value?: string) => value?.toLocaleUpperCase()
    render(
      (
        <>
          <CustomControl name="test" outgoingDataFormatter={formatter} formatInitialValue />
          <button type="submit">submit</button>
        </>
      ),
      { formValues: { test: 'test' }, onSubmit },
    )
    expect(screen.getByRole('textbox')).toHaveDisplayValue('test')
    await userEvent.click(screen.getByRole('button', { name: 'submit' }))

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        test: 'TEST',
      }, expect.anything())
    })
  })

  it('format change default value when "formatInitialValue" and "applyLocally" are enabled', async () => {
    const onSubmit = jest.fn()
    const formatter = (value?: string) => value?.toLocaleUpperCase()
    render(
      (
        <>
          <CustomControl name="test" outgoingDataFormatter={formatter} formatInitialValue applyLocally />
          <button type="submit">submit</button>
        </>
      ),
      { formValues: { test: 'test' }, onSubmit },
    )
    expect(screen.getByRole('textbox')).toHaveDisplayValue('TEST')
    await userEvent.click(screen.getByRole('button', { name: 'submit' }))

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        test: 'TEST',
      }, expect.anything())
    })
  })

  describe('Mui props', () => {
    it('forward props to the Textfield', () => {
      render(<CustomControl name="test" label="foo" />)
      expect(screen.getByLabelText('foo')).toBeInTheDocument()
    })
  })
})
