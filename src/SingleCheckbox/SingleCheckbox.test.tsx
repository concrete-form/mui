import render from '../testkit/render'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SingleCheckbox from './SingleCheckbox'

describe('SingleCheckbox', () => {
  it('render name prop', () => {
    render(<SingleCheckbox name="test" />)
    expect(screen.getByRole('checkbox')).toHaveAttribute('name', 'test')
  })

  it('render id prop', () => {
    render(<SingleCheckbox name="test" />)
    expect(screen.getByRole('checkbox')).toHaveAttribute('id')
  })

  it('render input as required', () => {
    render(<SingleCheckbox name="test" required />)
    const input = screen.getByRole('checkbox')
    expect(input).toBeRequired()
  })

  it('render other props to the input', () => {
    render(<SingleCheckbox name="test" inputProps={{ 'data-test': 'foo' } as any} />)
    expect(screen.getByRole('checkbox').dataset.test).toBe('foo')
  })

  it('render label', () => {
    render(<SingleCheckbox name="test" label="test-label" />)
    expect(screen.getByRole('checkbox', { name: 'test-label' })).toBeInTheDocument()
    expect(screen.getByText('test-label')).toBeInTheDocument()
  })

  it('render component label', () => {
    render(<SingleCheckbox name="test" label={<div data-testid="foo">test-label</div>} />)
    expect(screen.getByRole('checkbox', { name: 'test-label' })).toBeInTheDocument()
    expect(screen.getByText('test-label')).toBeInTheDocument()
    expect(screen.getByTestId('foo')).toBeInTheDocument()
  })

  it('render label right by default', () => {
    render(<SingleCheckbox name="test" label="test-label" />)
    expect(screen.getByTestId('item-label').dataset?.labelPosition).toBe('right')
  })

  it('render label in the required position', () => {
    render(<SingleCheckbox name="test" label="test-label" labelPosition="bottom" />)
    expect(screen.getByTestId('item-label').dataset?.labelPosition).toBe('bottom')
  })

  it('is unchecked by default', () => {
    render(<SingleCheckbox name="test" />)
    expect(screen.getByRole('checkbox')).not.toBeChecked()
  })

  it('render initial value', () => {
    render(<SingleCheckbox name="test" />, { formValues: { test: true } })
    expect(screen.getByRole('checkbox')).toBeChecked()
  })

  it('consider invalid value as "true"', () => {
    render(<SingleCheckbox name="test" />, { formValues: { test: 'im invalid' } })
    expect(screen.getByRole('checkbox')).toBeChecked()
  })

  it('render new value when changed', async () => {
    render(<SingleCheckbox name="test" />)
    const input = screen.getByRole('checkbox')
    await userEvent.click(input)
    await waitFor(() => {
      expect(input).toBeChecked()
    })
    await userEvent.click(input)
    await waitFor(() => {
      expect(input).not.toBeChecked()
    })
  })

  it('call onChange callback', async () => {
    const callback = jest.fn()
    render(<SingleCheckbox name="test" onChange={callback} />)
    await userEvent.click(screen.getByRole('checkbox'))
    await waitFor(() => {
      expect(callback).toHaveBeenCalledTimes(1)
    })
  })

  it('call onBlur callback', async () => {
    const callback = jest.fn()
    render(<SingleCheckbox name="test" onBlur={callback} />)
    await userEvent.click(screen.getByRole('checkbox'))
    await userEvent.click(document.body)
    await waitFor(() => {
      expect(callback).toHaveBeenCalledTimes(1)
    })
  })

  it('save data on the form', async () => {
    const onSubmit = jest.fn()
    render(<><SingleCheckbox name="test" /><button type="submit">submit</button></>, { onSubmit })
    await userEvent.click(screen.getByRole('checkbox'))
    await userEvent.click(screen.getByRole('button', { name: 'submit' }))
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({ test: true }, expect.anything())
    })
  })

  it('handle validation error', async () => {
    render(<SingleCheckbox name="test" fieldProps={{ required: 'testing errors' }} />, { formValues: { test: true } })
    const input = screen.getByRole('checkbox')
    expect(input).toBeValid()
    await userEvent.click(input)
    await userEvent.click(document.body)
    await waitFor(() => {
      expect(input).toBeInvalid()
    })
    expect(screen.getByText('testing errors')).toBeInTheDocument()
  })
})
