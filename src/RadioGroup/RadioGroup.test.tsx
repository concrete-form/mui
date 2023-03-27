import render from '../testkit/render'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import RadioGroup from './RadioGroup'

describe('Radio', () => {
  it('render options', () => {
    render(<RadioGroup name="test" options={['foo', 'bar']} />)
    expect(screen.getByRole('radio', { name: 'foo' })).toBeInTheDocument()
    expect(screen.getByRole('radio', { name: 'bar' })).toBeInTheDocument()
  })

  it('doesn\'t crash without options', () => {
    render(<RadioGroup name="test" />)
  })

  it('render same label/value for string option', () => {
    render(<RadioGroup name="test" options={['foo']} />)
    expect(screen.getByRole('radio', { name: 'foo' })).toHaveProperty('value', 'foo')
  })

  it('render labelled option', () => {
    render(<RadioGroup name="test" options={[{ label: 'foo', value: 'bar' }]} />)
    expect(screen.getByRole('radio', { name: 'foo' })).toHaveProperty('value', 'bar')
  })

  it('render component label', () => {
    render(<RadioGroup name="test" options={[{ label: <div data-testid="component-label">label</div>, value: 'bar' }]} />)
    expect(screen.getByTestId('component-label')).toBeInTheDocument()
  })

  it('render option props', () => {
    render(<RadioGroup name="test" options={[{ label: 'foo', value: 'foo', props: { disabled: true } }]} />)
    expect(screen.getByRole('radio', { name: 'foo' })).toBeDisabled()
  })

  it('render name prop on all options', () => {
    render(<RadioGroup name="test" options={['foo', 'bar']} />)
    // note: Mui handle unique name pro when using RadioGroup
    expect(screen.getByRole('radio', { name: 'foo' })).toHaveProperty('name')
    expect(screen.getByRole('radio', { name: 'bar' })).toHaveProperty('name')
  })

  it('render type radio prop', () => {
    render(<RadioGroup name="test" options={['foo']} />)
    expect(screen.getByRole('radio', { name: 'foo' })).toHaveProperty('type', 'radio')
  })

  it('doesn\'t render id prop', () => {
    render(<RadioGroup name="test" options={['foo']} />)
    expect(screen.getByRole('radio', { name: 'foo' })).toHaveProperty('id', '')
  })

  it('render inputs as required', () => {
    render(<RadioGroup name="test" options={['foo', 'bar']} required />)
    const fooOption = screen.getByRole('radio', { name: 'foo' })
    const barOption = screen.getByRole('radio', { name: 'bar' })
    expect(fooOption).toBeRequired()
    expect(barOption).toBeRequired()
  })

  it('render other props to all the inputs', () => {
    render(<RadioGroup name="test" options={['foo', 'bar']} data-testid="foo" />)
    expect(screen.getAllByTestId('foo')).toHaveLength(2)
  })

  it('render vertically by default', () => {
    render(<RadioGroup name="test" options={['foo']} />)
    expect(screen.getByTestId('group').dataset?.orientation).toBe('vertical')
  })

  it('render in the required orientation', () => {
    render(<RadioGroup name="test" options={['foo']} orientation="horizontal" />)
    expect(screen.getByTestId('group').dataset?.orientation).toBe('horizontal')
  })

  it('render label right by default', () => {
    render(<RadioGroup name="test" options={['foo']} />)
    expect(screen.getByTestId('item-label').dataset?.labelPosition).toBe('right')
  })

  it('render label in the required position', () => {
    render(<RadioGroup name="test" options={['foo']} labelPosition="bottom" />)
    expect(screen.getByTestId('item-label').dataset?.labelPosition).toBe('bottom')
  })

  it('render initial value', () => {
    render(<RadioGroup name="test" options={['foo', 'bar', 'baz']} />, { formValues: { test: 'bar' } })
    expect(screen.getByRole('radio', { name: 'foo' })).not.toBeChecked()
    expect(screen.getByRole('radio', { name: 'bar' })).toBeChecked()
    expect(screen.getByRole('radio', { name: 'baz' })).not.toBeChecked()
  })

  it('render new value when changed', async () => {
    render(<RadioGroup name="test" options={['foo', 'bar']} />, { formValues: { test: 'bar' } })
    const fooOption = screen.getByRole('radio', { name: 'foo' })
    const barOption = screen.getByRole('radio', { name: 'bar' })
    await userEvent.click(fooOption)
    await waitFor(() => {
      expect(fooOption).toBeChecked()
    })
    expect(barOption).not.toBeChecked()
  })

  it('call onChange callback', async () => {
    const callback = jest.fn()
    render(<RadioGroup name="test" options={['foo']} onChange={callback} />)
    await userEvent.click(screen.getByRole('radio', { name: 'foo' }))

    await waitFor(() => {
      expect(callback).toHaveBeenCalled()
    })
  })

  it('call onBlur callback', async () => {
    const callback = jest.fn()
    render(<RadioGroup name="test" options={['foo']} onBlur={callback} />)
    await userEvent.click(screen.getByRole('radio', { name: 'foo' }))
    await userEvent.click(document.body)

    await waitFor(() => {
      expect(callback).toHaveBeenCalled()
    })
  })

  it('save data on the form', async () => {
    const onSubmit = jest.fn()
    render(<><RadioGroup name="test" options={['foo', 'bar', 'baz']} /><button type="submit">submit</button></>, { onSubmit })
    await userEvent.click(screen.getByRole('radio', { name: 'bar' }))
    await userEvent.click(screen.getByRole('button', { name: 'submit' }))

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({ test: 'bar' }, expect.anything())
    })
  })

  it('handle validation error', async () => {
    const onSubmit = jest.fn()
    const validateRadio = (value: any) => value != null ? true : 'testing errors'
    render((
      <>
        <RadioGroup name="test" options={['foo']} fieldProps={{ validate: validateRadio }} />
        <button type="submit">submit</button>
      </>
    ), { onSubmit })
    await userEvent.click(screen.getByRole('button', { name: 'submit' }))
    await waitFor(() => {
      expect(screen.getByRole('radio', { name: 'foo' })).toBeInvalid()
    })
    expect(screen.getByText('testing errors')).toBeInTheDocument()
  })
})
