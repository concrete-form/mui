import render from '../testkit/render'
import { screen } from '@testing-library/react'
import FileInput from './FileInput'

describe('FileInput', () => {
  // FileInput extend Input control, not duplicating all tests
  it('render type file', () => {
    render(<FileInput name="test" inputProps={{ 'data-testid': 'test' }} />)
    expect(screen.getByTestId('test')).toHaveAttribute('type', 'file')
    expect(screen.getByTestId('test')).not.toHaveAttribute('multiple')
  })

  it('render with multiple', () => {
    render(<FileInput name="test" inputProps={{ 'data-testid': 'test', multiple: true }} />)
    expect(screen.getByTestId('test')).toHaveAttribute('multiple')
  })
})
