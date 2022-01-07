import render from '../testkit/render'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LabelledControl from './LabelledControl'
import Input from '../Input'
import RadiosGroup from '../RadiosGroup'

describe('LabelledControl', () => {
  it('render the label', () => {
    render(<LabelledControl label="test-label" />)
    expect(screen.getByText('test-label')).toBeInTheDocument()
  })

  it('render the component label', () => {
    render(<LabelledControl label={<span data-testid="foo">test-label</span>} />)
    expect(screen.getByText('test-label')).toBeInTheDocument()
    expect(screen.getByTestId('foo')).toBeInTheDocument()
  })

  it('render the label at left by default', () => {
    render(<LabelledControl label="label-test" />)
    expect(screen.getByTestId('labelled-control').dataset?.labelPosition).toBe('left')
  })

  it('render left label', () => {
    render(<LabelledControl label="label-test" labelPosition="left" />)
    expect(screen.getByTestId('labelled-control').dataset?.labelPosition).toBe('left')
  })

  it('render right label', () => {
    render(<LabelledControl label="label-test" labelPosition="right" />)
    expect(screen.getByTestId('labelled-control').dataset?.labelPosition).toBe('right')
  })

  it('render top label', () => {
    render(<LabelledControl label="label-test" labelPosition="top" />)
    expect(screen.getByTestId('labelled-control').dataset?.labelPosition).toBe('top')
  })

  it('render bottom label', () => {
    render(<LabelledControl label="label-test" labelPosition="bottom" />)
    expect(screen.getByTestId('labelled-control').dataset?.labelPosition).toBe('bottom')
  })

  it('render the control', () => {
    render(<LabelledControl label="label-test"><Input name="testInput" /></LabelledControl>)
    expect(screen.getByRole('textbox', { name: 'label-test' })).toBeInTheDocument()
  })

  it('link the label and control', () => {
    render(<LabelledControl label="label-test"><Input name="testInput" /></LabelledControl>)
    userEvent.click(screen.getByText('label-test'))
    expect(screen.getByRole('textbox', { name: 'label-test' })).toHaveFocus()
  })

  it('doesn\'t link the label and control for input groups', () => {
    render(<LabelledControl label="label-test"><RadiosGroup name="testInput" options={['foo']} /></LabelledControl>)
    const radioInput = screen.getByRole('radio', { name: 'foo' })
    expect(radioInput).not.toBeChecked()
    userEvent.click(screen.getByText('label-test'))
    expect(radioInput).not.toBeChecked()
  })

  describe('Mui props', () => {
    it('forwards props to each Grid Element', () => {
      const props = {
        mainGridProps: { 'data-testid': 'foo' },
        labelGridProps: { 'data-testid': 'bar' },
        controlGridProps: { 'data-testid': 'baz' },
      }
      render(<LabelledControl label="label-test" {...props as any}>test</LabelledControl>)
      expect(screen.getByTestId('foo')).toBeInTheDocument()
      expect(screen.getByTestId('bar')).toBeInTheDocument()
      expect(screen.getByTestId('baz')).toBeInTheDocument()
    })
  })
})
