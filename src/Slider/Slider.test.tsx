import render from '../testkit/render'
import { screen, fireEvent, waitFor, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Slider from './Slider'

const wait = async (delay: number) => await new Promise(resolve => setTimeout(resolve, delay))

describe('Slider', () => {
  it('render name prop', () => {
    render(<Slider name="test" />)
    expect(screen.getByRole('slider')).toHaveAttribute('name', 'test')
  })

  it('render initial value', () => {
    render(<Slider name="test" />, { formValues: { test: 77 } })
    expect(screen.getByRole('slider')).toHaveDisplayValue('77')
  })

  it('render new value when changed', async () => {
    render(<Slider name="test" />)
    const slider = screen.getByRole('slider')
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      // fixme: using fireEvent since it's pretty hard to test slider accurately with real user events
      fireEvent.change(slider, { target: { value: 88 } })
      await wait(10)
    })

    expect(slider).toHaveDisplayValue('88')
  })

  it('call onChange callback', async () => {
    const callback = jest.fn()
    render(<Slider name="test" onChange={callback} />)

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      // fixme: using fireEvent since it's pretty hard to test slider accurately with real user events
      fireEvent.change(screen.getByRole('slider'), { target: { value: 99 } })
      await wait(10)
    })

    await waitFor(() => {
      expect(callback).toHaveBeenCalled()
    })
  })

  it('call onBlur callback', async () => {
    const callback = jest.fn()
    render(<Slider name="test" onBlur={callback} />)
    fireEvent.blur(screen.getByRole('slider'))
    await waitFor(() => {
      expect(callback).toHaveBeenCalled()
    })
  })

  it('save data on the form', async () => {
    const onSubmit = jest.fn()
    render(<><Slider name="test" /><button type="submit">submit</button></>, { onSubmit })
    fireEvent.change(screen.getByRole('slider'), { target: { value: 33 } })
    await userEvent.click(screen.getByRole('button', { name: 'submit' }))
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({ test: 33 }, expect.anything())
    })
  })

  it('handle validation error', async () => {
    render(<Slider name="test" fieldProps={{ min: { value: 50, message: 'testing errors' } }} />)
    fireEvent.change(screen.getByRole('slider'), { target: { value: 49 } })
    await waitFor(() => {
      expect(screen.getByText('testing errors')).toBeInTheDocument()
    })
  })

  it('render label', () => {
    render(<Slider name="test" label="foo" />)
    expect(screen.getByText('foo')).toBeInTheDocument()
  })

  it('render label top by default', () => {
    render(<Slider name="test" label="foo" />)
    expect(screen.getByTestId('item-label').dataset?.labelPosition).toBe('top')
  })

  it('render label in the required position', () => {
    render(<Slider name="test" label="foo" labelPosition="bottom" />)
    expect(screen.getByTestId('item-label').dataset?.labelPosition).toBe('bottom')
  })

  it('adds top margin when there is a top label and vertical orientation', () => {
    render(<Slider name="test" label="foo" labelPosition="top" orientation="vertical" height={150} />)
    expect(screen.getByTestId('slider-wrapper')).toHaveStyle('margin-top: 16px')
  })

  it('adds bottom margin when there is a bottom label and vertical orientation', () => {
    render(<Slider name="test" label="foo" labelPosition="bottom" orientation="vertical" height={150} />)
    expect(screen.getByTestId('slider-wrapper')).toHaveStyle('margin-bottom: 16px')
  })

  it('print a warning when trying to print in other orientation than top or bottom', () => {
    const originalConsoleWarn = console.warn
    console.warn = jest.fn()
    render(<Slider name="test" label="foo" labelPosition="left" />)
    expect(screen.getByTestId('item-label').dataset?.labelPosition).toBe('top')
    expect(console.warn).toHaveBeenCalledWith('Label can only be vertical with MUI Switch')
    console.warn = originalConsoleWarn
  })

  describe('Mui props', () => {
    it('forward props to the Slider', () => {
      render(<Slider name="test" orientation="vertical" height={150} />)
      expect(screen.getByRole('slider')).toHaveAttribute('aria-orientation', 'vertical')
    })

    it('print a warning when orientation is vertical without height prop', () => {
      const originalConsoleWarn = console.warn
      console.warn = jest.fn()
      render(<Slider name="test" orientation="vertical" />)
      expect(console.warn).toHaveBeenCalledWith('Missing "height" prop with vertical slider')
      console.warn = originalConsoleWarn
    })

    it('print a warning when height prop is provided without vertical orientation', () => {
      const originalConsoleWarn = console.warn
      console.warn = jest.fn()
      render(<Slider name="test" height={123} />)
      expect(console.warn).toHaveBeenCalledWith('Prop "height" has no effect when slider is not vertical')
      console.warn = originalConsoleWarn
    })

    it('handle range value', async () => {
      const onSubmit = jest.fn()
      render(<><Slider name="test" /><button type="submit">submit</button></>, { formValues: { test: [12, 34] }, onSubmit })
      const sliders = screen.getAllByRole('slider')
      expect(sliders[0]).toHaveDisplayValue('12')
      expect(sliders[1]).toHaveDisplayValue('34')
      fireEvent.change(sliders[0], { target: { value: 10 } })
      fireEvent.change(sliders[1], { target: { value: 60 } })
      await userEvent.click(screen.getByRole('button', { name: 'submit' }))
      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledWith({ test: [10, 60] }, expect.anything())
      })
    })
  })
})
