import render from '../testkit/render'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CheckboxGroup from './CheckboxGroup'

describe('CheckboxGroup', () => {
  it('render options', () => {
    render(<CheckboxGroup name="test" options={['foo', 'bar']} />)
    expect(screen.getByRole('checkbox', { name: 'foo' })).toBeInTheDocument()
    expect(screen.getByRole('checkbox', { name: 'bar' })).toBeInTheDocument()
  })

  it('doesn\'t crash without options', () => {
    render(<CheckboxGroup name="test" />)
  })

  it('render same label/value for string option', () => {
    render(<CheckboxGroup name="test" options={['foo']} />)
    expect(screen.getByRole('checkbox', { name: 'foo' })).toHaveProperty('value', 'foo')
  })

  it('render labelled option', () => {
    render(<CheckboxGroup name="test" options={[{ label: 'foo', value: 'bar' }]} />)
    expect(screen.getByRole('checkbox', { name: 'foo' })).toHaveProperty('value', 'bar')
  })

  it('render component label', () => {
    render(<CheckboxGroup name="test" options={[{ label: <div data-testid="component-label">label</div>, value: 'bar' }]} />)
    expect(screen.getByTestId('component-label')).toBeInTheDocument()
  })

  it('render option props', () => {
    render(<CheckboxGroup name="test" options={[{ label: 'foo', value: 'foo', props: { disabled: true } }]} />)
    expect(screen.getByRole('checkbox', { name: 'foo' })).toBeDisabled()
  })

  it('render name prop on all options', () => {
    render(<CheckboxGroup name="test" options={['foo', 'bar']} />)
    expect(screen.getByRole('checkbox', { name: 'foo' })).toHaveProperty('name', 'test')
    expect(screen.getByRole('checkbox', { name: 'bar' })).toHaveProperty('name', 'test')
  })

  it('render type checkbox prop', () => {
    render(<CheckboxGroup name="test" options={['foo']} />)
    expect(screen.getByRole('checkbox', { name: 'foo' })).toHaveProperty('type', 'checkbox')
  })

  it('doesn\'t render id prop', () => {
    render(<CheckboxGroup name="test" options={['foo']} />)
    expect(screen.getByRole('checkbox', { name: 'foo' })).toHaveProperty('id', '')
  })

  it('render inputs as required', () => {
    render(<CheckboxGroup name="test" options={['foo', 'bar']} required />)
    const fooOption = screen.getByRole('checkbox', { name: 'foo' })
    const barOption = screen.getByRole('checkbox', { name: 'bar' })
    expect(fooOption).toBeRequired()
    expect(barOption).toBeRequired()
  })

  it('render other props to all the inputs', () => {
    render(<CheckboxGroup name="test" options={['foo', 'bar']} data-testid="foo" />)
    expect(screen.getAllByTestId('foo')).toHaveLength(2)
  })

  it('render vertically by default', () => {
    render(<CheckboxGroup name="test" options={['foo']} />)
    expect(screen.getByTestId('group').dataset?.orientation).toBe('vertical')
  })

  it('render in the required orientation', () => {
    render(<CheckboxGroup name="test" options={['foo']} orientation="horizontal" />)
    expect(screen.getByTestId('group').dataset?.orientation).toBe('horizontal')
  })

  it('render label right by default', () => {
    render(<CheckboxGroup name="test" options={['foo']} />)
    expect(screen.getByTestId('item-label').dataset?.labelPosition).toBe('right')
  })

  it('render label in the required position', () => {
    render(<CheckboxGroup name="test" options={['foo']} labelPosition="bottom" />)
    expect(screen.getByTestId('item-label').dataset?.labelPosition).toBe('bottom')
  })

  it('render initial value', () => {
    render(<CheckboxGroup name="test" options={['foo', 'bar', 'baz']} />, { formValues: { test: ['foo', 'baz'] } })
    expect(screen.getByRole('checkbox', { name: 'foo' })).toBeChecked()
    expect(screen.getByRole('checkbox', { name: 'bar' })).not.toBeChecked()
    expect(screen.getByRole('checkbox', { name: 'baz' })).toBeChecked()
  })

  it('ignores invalid string value', () => {
    render(<CheckboxGroup name="test" options={['foo', 'bar']} />, { formValues: { test: 'foo' } })
    expect(screen.getByRole('checkbox', { name: 'foo' })).not.toBeChecked()
    expect(screen.getByRole('checkbox', { name: 'bar' })).not.toBeChecked()
  })

  it('render new value when changed', async () => {
    render(<CheckboxGroup name="test" options={['foo', 'bar']} />, { formValues: { test: ['bar'] } })
    const fooOption = screen.getByRole('checkbox', { name: 'foo' })
    const barOption = screen.getByRole('checkbox', { name: 'bar' })
    await userEvent.click(fooOption)
    await userEvent.click(barOption)
    await waitFor(() => {
      expect(fooOption).toBeChecked()
    })
    expect(barOption).not.toBeChecked()
  })

  it('call onChange callback', async () => {
    const callback = jest.fn()
    render(<CheckboxGroup name="test" options={['foo']} onChange={callback} />)
    await userEvent.click(screen.getByRole('checkbox', { name: 'foo' }))

    await waitFor(() => {
      expect(callback).toHaveBeenCalled()
    })
  })

  it('call onBlur callback', async () => {
    const callback = jest.fn()
    render(<CheckboxGroup name="test" options={['foo']} onBlur={callback} />)
    await userEvent.click(screen.getByRole('checkbox', { name: 'foo' }))
    await userEvent.click(document.body)

    await waitFor(() => {
      expect(callback).toHaveBeenCalled()
    })
  })

  it('save data on the form', async () => {
    const onSubmit = jest.fn()
    render(<><CheckboxGroup name="test" options={['foo', 'bar', 'baz']} /><button type="submit">submit</button></>, { onSubmit })
    await userEvent.click(screen.getByRole('checkbox', { name: 'bar' }))
    await userEvent.click(screen.getByRole('checkbox', { name: 'baz' }))
    await userEvent.click(screen.getByRole('button', { name: 'submit' }))
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({ test: ['bar', 'baz'] }, expect.anything())
    })
  })

  it('handle validation error', async () => {
    const validateCheckbox = (values: any[]) => values?.length > 0 ? true : 'testing errors'
    render(<CheckboxGroup name="test" options={['foo']} fieldProps={{ validate: { required: validateCheckbox } }} />)
    const fooOption = screen.getByRole('checkbox', { name: 'foo' })
    await userEvent.click(fooOption)
    await userEvent.click(fooOption)
    await userEvent.click(document.body)

    await waitFor(() => {
      expect(fooOption).toBeInvalid()
    })
    expect(screen.getByText('testing errors')).toBeInTheDocument()
  })
})
