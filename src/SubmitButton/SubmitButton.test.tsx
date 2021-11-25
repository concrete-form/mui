import render from '../testkit/render'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Input from '../Input'
import SubmitButton from './SubmitButton'

describe('SubmitButton', () => {
  it('render type submit', () => {
    render(<SubmitButton>Foo</SubmitButton>)
    expect(screen.getByRole('button')).toHaveProperty('type', 'submit')
  })

  it('render children property', () => {
    render(<SubmitButton>Foo</SubmitButton>)
    expect(screen.getByRole('button', { name: 'Foo' })).toBeInTheDocument()
  })

  it('render other props to the button', () => {
    render(<SubmitButton data-test="foo">Foo</SubmitButton>)
    expect(screen.getByRole('button').dataset.test).toBe('foo')
  })

  it('submit the form when clicked', async () => {
    const onSubmit = jest.fn()
    render(<SubmitButton>Foo</SubmitButton>, { onSubmit })
    userEvent.click(screen.getByRole('button'))
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(1)
    })
  })

  it('is disabled when there are errors on the form', async () => {
    render(<><Input name="test" fieldProps={{ required: true }} /><SubmitButton>submit</SubmitButton></>)
    const input = screen.getByRole('textbox')
    userEvent.click(input)
    userEvent.click(document.body)
    await waitFor(() => {
      expect(screen.getByRole('button')).toBeDisabled()
    })
  })

  it('is disabled when submitting and enabled back after', async () => {
    render(<SubmitButton>submit</SubmitButton>, { onSubmit: jest.fn() })
    userEvent.click(screen.getByRole('button'))
    await waitFor(() => {
      expect(screen.getByRole('button')).toBeDisabled()
    })
    expect(screen.getByRole('button')).not.toBeDisabled()
  })

  it('render a spinner by default when loading and disapear after', async () => {
    render(<SubmitButton>submit</SubmitButton>, { onSubmit: jest.fn() })
    userEvent.click(screen.getByRole('button'))
    await waitFor(() => {
      expect(screen.getByTestId('spinner')).toBeInTheDocument()
    })
    expect(screen.queryByTestId('spinner')).not.toBeInTheDocument()
  })

  it('Doesn\'t render loading component when "displayLoading" is disabled', async () => {
    render(<SubmitButton displayLoading={false}>submit</SubmitButton>, { onSubmit: jest.fn() })
    userEvent.click(screen.getByRole('button'))
    await waitFor(() => {
      expect(screen.getByRole('button')).toBeDisabled()
      expect(screen.getByRole('button')).toHaveTextContent('submit')
    })
    expect(screen.getByRole('button')).toBeEnabled()
    expect(screen.getByRole('button')).toHaveTextContent('submit')
  })

  it('render custom loading component and disapear after', async () => {
    render(<SubmitButton loadingComponent={<span data-testid="custom">custom</span>}> submit</SubmitButton>, { onSubmit: jest.fn() })
    userEvent.click(screen.getByRole('button'))
    await waitFor(() => {
      expect(screen.getByRole('button')).toHaveTextContent('submitcustom')
      expect(screen.getByTestId('custom')).toBeInTheDocument()
    })
    expect(screen.getByRole('button')).toHaveTextContent('submit')
  })

  it('render alternate content while loading and is reverted back after', async () => {
    render(<SubmitButton alternateLoadingContent={<span data-testid="custom">custom</span>}> submit</SubmitButton>, { onSubmit: jest.fn() })
    userEvent.click(screen.getByRole('button'))
    await waitFor(() => {
      expect(screen.getByRole('button')).toHaveTextContent('custom')
      expect(screen.getByTestId('custom')).toBeInTheDocument()
    })
    expect(screen.getByRole('button')).toHaveTextContent('submit')
  })
})
