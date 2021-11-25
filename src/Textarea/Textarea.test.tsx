import render from '../testkit/render'
import { screen } from '@testing-library/react'
import Textarea from './Textarea'

describe('Textarea', () => {
  // Textarea extend Input control, not duplicating all tests
  it('render textfield as a textarea', () => {
    const { container } = render(<Textarea name="test" />)
    expect(container).toContainHTML('<textarea ')
  })

  it('forwards all props to mui textfield', () => {
    render(<Textarea name="test" minRows={undefined} rows={10} />)
    expect(screen.getByRole('textbox')).toHaveAttribute('rows', '10')
  })
})
