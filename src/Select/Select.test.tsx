import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import MenuItem from '@mui/material/MenuItem'

import render from '../testkit/render'
import Select from './Select'

describe('Select', () => {
  describe('native select', () => {
    it('render name prop', () => {
      render(<Select native name="test" />)
      expect(screen.getByRole('combobox')).toHaveAttribute('name', 'test')
    })

    it('render id prop', () => {
      render(<Select native name="test" />)
      expect(screen.getByRole('combobox')).toHaveAttribute('id')
    })

    it('render select as required', () => {
      render(<Select native name="test" required />)
      const select = screen.getByRole('combobox')
      expect(select).toBeRequired()
    })

    it('forwards other props to SelectProps', () => {
      render(<Select native name="test" data-testid="foo" />)
      expect(screen.getByTestId('foo')).toBeInTheDocument()
    })

    it('render options', () => {
      render(<Select native name="test" options={['foo', { label: 'bar', value: 'bar' }, 'baz']} />)
      expect(screen.getByRole('option', { name: 'foo' })).toBeInTheDocument()
      expect(screen.getByRole('option', { name: 'bar' })).toBeInTheDocument()
      expect(screen.getByRole('option', { name: 'baz' })).toBeInTheDocument()
      expect(screen.getAllByRole('option')).toHaveLength(3)
    })

    it('doesn\'t crash without options', () => {
      render(<Select native name="test" />)
    })

    it('render same label/value for string option', () => {
      render(<Select native name="test" options={['foo']} />)
      expect(screen.getByRole('option', { name: 'foo' })).toHaveProperty('value', 'foo')
    })

    it('render labelled option', () => {
      render(<Select native name="test" options={[{ label: 'foo', value: 'bar' }]} />)
      expect(screen.getByRole('option', { name: 'foo' })).toHaveProperty('value', 'bar')
    })

    it('render option props', () => {
      render(<Select native name="test" options={[{ label: 'foo', value: 'foo', props: { disabled: true } }]} />)
      expect(screen.getByRole('option', { name: 'foo' })).toBeDisabled()
    })

    it('render options with group', () => {
      render(<Select
        native
        name="test"
        options={[
          'foo',
          { group: 'group 1', options: ['a', { label: 'b', value: 'b' }, 'c'] },
          { group: 'group 2', options: ['d'] },
          'bar',
        ]}
      />)
      expect(screen.getByRole('group', { name: 'group 1' })).toBeInTheDocument()
      expect(screen.getByRole('group', { name: 'group 2' })).toBeInTheDocument()
      expect(screen.getAllByRole('option')).toHaveLength(6)
    })

    it('render groups with no label', () => {
      render(<Select
        native
        name="test"
        options={[
          { group: undefined, options: ['foo', 'bar'] },
          'foo',
        ]}
      />)
      expect(screen.getByRole('group')).toHaveProperty('label', '')
      expect(screen.getAllByRole('option')).toHaveLength(3)
    })

    it('render groups props', () => {
      render(<Select
        native
        name="test"
        options={[
          { group: 'group', options: ['foo', 'bar'], props: { disabled: true } },
          'foo',
        ]}
      />)
      expect(screen.getByRole('group')).toBeDisabled()
    })

    it('render children', () => {
      render(<Select native name="test"><option value="foo">foo</option><option value="bar">bar</option></Select>)
      expect(screen.getByRole('option', { name: 'foo' })).toBeInTheDocument()
      expect(screen.getByRole('option', { name: 'bar' })).toBeInTheDocument()
    })

    it('call onChange callback', async () => {
      const callback = jest.fn()
      render(<Select native name="test" options={['foo']} onChange={callback} />)
      await userEvent.selectOptions(screen.getByRole('combobox'), 'foo')
      await waitFor(() => {
        expect(callback).toHaveBeenCalledTimes(1)
      })
    })

    it('call onBlur callback', async () => {
      const callback = jest.fn()
      render(<Select native name="test" onBlur={callback} />)
      await userEvent.click(screen.getByRole('combobox'))
      await userEvent.click(document.body)
      await waitFor(() => {
        expect(callback).toHaveBeenCalledTimes(1)
      })
    })

    it('handle validation error', async () => {
      render(<Select native name="test" fieldProps={{ required: 'testing errors' }} />)
      const select = screen.getByRole('combobox')
      expect(select).toBeValid()
      await userEvent.click(select)
      await userEvent.click(document.body)
      await waitFor(() => {
        expect(select).toBeInvalid()
      })
      expect(screen.getByText('testing errors')).toBeInTheDocument()
    })

    it('save first item when not filled', async () => {
      const onSubmit = jest.fn()
      render(<><Select native name="test" options={['foo', 'bar', 'baz']} /><button type="submit">submit</button></>, { onSubmit })
      await userEvent.click(screen.getByRole('button', { name: 'submit' }))
      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledWith({ test: 'foo' }, expect.anything())
      })
    })

    describe('Select with single value', () => {
      it('render an empty option when "allowEmpty" is set to true', () => {
        render(<Select native name="test" allowEmpty options={['foo']} />)
        expect(screen.getByRole('option', { name: '' })).toBeInTheDocument()
        expect(screen.getAllByRole('option')).toHaveLength(2)
      })

      it('render initial value', () => {
        render(<Select native name="test" options={['foo', 'bar', 'baz']} />, { formValues: { test: 'bar' } })
        expect(screen.getByRole('combobox')).toHaveDisplayValue('bar')
      })

      it('render new value when changed', async () => {
        render(<Select native name="test" options={['foo', 'bar', 'baz']} />)
        const select = screen.getByRole('combobox')
        await userEvent.selectOptions(select, 'bar')
        await waitFor(() => {
          expect(select).toHaveDisplayValue('bar')
        })
      })

      it('save data on the form', async () => {
        const onSubmit = jest.fn()
        render(<><Select native name="test" options={['foo', 'bar', 'baz']} /><button type="submit">submit</button></>, { onSubmit })
        await userEvent.selectOptions(screen.getByRole('combobox'), 'baz')
        await userEvent.click(screen.getByRole('button', { name: 'submit' }))
        await waitFor(() => {
          expect(onSubmit).toHaveBeenCalledWith({ test: 'baz' }, expect.anything())
        })
      })

      it('returns empty string when an empty value is selected', async () => {
        const onSubmit = jest.fn()
        render(<><Select native name="test" options={['foo']} allowEmpty /><button type="submit">submit</button></>, { onSubmit })
        const selectInput = screen.getByRole('combobox')
        await userEvent.selectOptions(selectInput, 'foo')
        await userEvent.selectOptions(selectInput, '')
        await userEvent.click(screen.getByRole('button', { name: 'submit' }))
        await waitFor(() => {
          expect(onSubmit).toHaveBeenCalledWith({ test: '' }, expect.anything())
        })
      })
    })

    describe('Select with multiple values', () => {
      it('ignore "allowEmpty" when "multiple" is enabled', () => {
        render(<Select native name="test" allowEmpty multiple options={['foo']} />)
        expect(screen.queryByRole('option', { name: '' })).not.toBeInTheDocument()
        expect(screen.getAllByRole('option')).toHaveLength(1)
      })

      it('render initial value', () => {
        render(<Select native multiple name="test" options={['foo', 'bar', 'baz']} />, { formValues: { test: ['foo', 'baz'] } })
        expect(screen.getByRole('listbox')).toHaveDisplayValue(['foo', 'baz'])
      })

      // fixme ! broken native multiple select (Mui bug or implementation bug ?)
      xit('render new value when changed', async () => {
        render(<Select native multiple name="test" options={['foo', 'bar', 'baz']} />)
        const select = screen.getByRole('listbox')
        await userEvent.selectOptions(select, ['bar', 'baz'])
        await waitFor(() => {
          expect(select).toHaveDisplayValue(['bar', 'baz'])
        })
      })

      // fixme ! broken native multiple select (Mui bug or implementation bug ?)
      xit('save data on the form', async () => {
        const onSubmit = jest.fn()
        render(<><Select native multiple name="test" options={['foo', 'bar', 'baz']} /><button type="submit">submit</button></>, { onSubmit })
        const select = screen.getByRole('listbox')
        await userEvent.selectOptions(select, ['foo', 'bar'])
        await waitFor(() => {
          expect(select).toHaveDisplayValue(['foo', 'bar'])
        })
        await userEvent.click(screen.getByRole('button', { name: 'submit' }))
        await waitFor(() => {
          expect(onSubmit).toHaveBeenCalledWith({ test: ['foo', 'bar'] }, expect.anything())
        })
      })

      it('returns an array even if only one item is selected', async () => {
        const onSubmit = jest.fn()
        render(<><Select native multiple name="test" options={['foo', 'bar', 'baz']} /><button type="submit">submit</button></>, { onSubmit })
        await userEvent.selectOptions(screen.getByRole('listbox'), 'foo')
        await userEvent.click(screen.getByRole('button', { name: 'submit' }))
        await waitFor(() => {
          expect(onSubmit).toHaveBeenCalledWith({ test: ['foo'] }, expect.anything())
        })
      })
    })
  })

  describe('MUI select', () => {
    it('render options as menu items', async () => {
      render(<Select name="test" options={['foo', { label: 'bar', value: 'bar' }, 'baz']} />)
      await userEvent.click(screen.getByRole('button'))
      expect(screen.getByRole('option', { name: 'foo' })).toBeInTheDocument()
      expect(screen.getByRole('option', { name: 'bar' })).toBeInTheDocument()
      expect(screen.getByRole('option', { name: 'baz' })).toBeInTheDocument()
      expect(screen.getAllByRole('option')).toHaveLength(3)
    })

    it('doesn\'t crash without options', () => {
      render(<Select name="test" />)
    })

    it('render same label/value for string option', async () => {
      render(<Select name="test" options={['foo']} />)
      await userEvent.click(screen.getByRole('button'))
      expect(screen.getByRole('option', { name: 'foo' }).dataset.value).toBe('foo')
    })

    it('render labelled option', async () => {
      render(<Select name="test" options={[{ label: 'foo', value: 'bar' }]} />)
      await userEvent.click(screen.getByRole('button'))
      expect(screen.getByRole('option', { name: 'foo' }).dataset.value).toBe('bar')
    })

    it('render option props', async () => {
      render(<Select name="test" options={[{ label: 'foo', value: 'foo', props: { disabled: true } }]} />)
      await userEvent.click(screen.getByRole('button'))
      expect(screen.getByRole('option', { name: 'foo' })).toHaveAttribute('aria-disabled')
    })

    it('render options with group', async () => {
      render(<Select
        name="test"
        options={[
          'foo',
          { group: 'group 1', options: ['a', { label: 'b', value: 'b' }, 'c'] },
          { group: 'group 2', options: ['d'] },
          'bar',
        ]}
      />)
      await userEvent.click(screen.getByRole('button'))
      // note : MUI identify group as option
      expect(screen.getByRole('option', { name: 'group 1' })).toBeInTheDocument()
      expect(screen.getByRole('option', { name: 'group 2' })).toBeInTheDocument()
      expect(screen.getAllByRole('option')).toHaveLength(8) // 6 options + 2 groups
    })

    it('render groups with no label', async () => {
      render(<Select
        name="test"
        options={[
          { group: undefined, options: ['foo', 'bar'] },
          'baz',
        ]}
      />)
      await userEvent.click(screen.getByRole('button'))
      // note : MUI identify group as option
      expect(screen.getAllByRole('option')[0]).toHaveTextContent('')
      expect(screen.getAllByRole('option')).toHaveLength(4) // 3 options + 1 group
    })

    it('render groups props', async () => {
      render(<Select
        name="test"
        options={[
          { group: 'group', options: ['foo', 'bar'], props: { disabled: true } as any },
          'baz',
        ]}
      />)
      await userEvent.click(screen.getByRole('button'))
      // note : MUI identify group as option
      expect(screen.getAllByRole('option')[0]).toHaveAttribute('disabled')
    })

    it('render children', async () => {
      render((
        <Select name="test">
          <MenuItem value="foo">foo</MenuItem>
          <MenuItem value="bar">bar</MenuItem>
        </Select>
      ))
      await userEvent.click(screen.getByRole('button'))
      expect(screen.getByRole('option', { name: 'foo' })).toBeInTheDocument()
      expect(screen.getByRole('option', { name: 'bar' })).toBeInTheDocument()
    })

    it('call onChange callback', async () => {
      const callback = jest.fn()
      render(<Select name="test" options={['foo']} onChange={callback} />)
      await userEvent.click(screen.getByRole('button'))
      await userEvent.click(screen.getByRole('option'))
      await waitFor(() => {
        expect(callback).toHaveBeenCalledTimes(1)
      })
    })

    it('call onBlur callback', async () => {
      const callback = jest.fn()
      render(<Select name="test" options={['foo']} onBlur={callback} />)
      // note: the menu open in a modal while testing and selecting an option seem to be the only option to close the modal
      // then, click the body trigger the onBlur event
      await userEvent.click(screen.getByRole('button'))
      await userEvent.click(screen.getByRole('option'))
      await userEvent.click(document.body)
      await waitFor(() => {
        expect(callback).toHaveBeenCalledTimes(1)
      })
    })

    it('handle validation error', async () => {
      render(<Select name="test" options={['foo']} allowEmpty fieldProps={{ required: 'testing errors' }} />)
      await userEvent.click(screen.getByRole('button'))
      await userEvent.click(screen.getAllByRole('option')[0])
      await userEvent.click(document.body)
      await waitFor(() => {
        expect(screen.getByText('testing errors')).toBeInTheDocument()
      })
    })

    it('save first item when not filled', async () => {
      const onSubmit = jest.fn()
      render(<><Select name="test" options={['foo', 'bar', 'baz']} /><button type="submit">submit</button></>, { onSubmit })
      await userEvent.click(screen.getByRole('button', { name: 'submit' }))
      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledWith({ test: 'foo' }, expect.anything())
      })
    })

    describe('Select with single value (multiple = false)', () => {
      it('render an empty option when "allowEmpty" is set to true', async () => {
        render(<Select name="test" allowEmpty options={['foo']} />)
        await userEvent.click(screen.getByRole('button'))
        expect(screen.getByRole('option', { name: '' })).toBeInTheDocument()
        expect(screen.getAllByRole('option')).toHaveLength(2)
      })

      it('render initial value', () => {
        render(<Select name="test" options={['foo', 'bar', 'baz']} />, { formValues: { test: 'bar' } })
        expect(screen.getByRole('textbox', { hidden: true })).toHaveDisplayValue('bar')
      })

      it('render new value when changed', async () => {
        render(<Select name="test" options={['foo', 'bar', 'baz']} />)
        await userEvent.click(screen.getByRole('button'))
        await userEvent.click(screen.getByRole('option', { name: 'bar' }))
        await userEvent.click(document.body)
        await waitFor(() => {
          expect(screen.getByRole('textbox', { hidden: true })).toHaveDisplayValue('bar')
        })
      })

      it('save data on the form', async () => {
        const onSubmit = jest.fn()
        render(<><Select name="test" options={['foo', 'bar', 'baz']} /><button type="submit">submit</button></>, { onSubmit })
        await userEvent.click(screen.getAllByRole('button')[0])
        await userEvent.click(screen.getByRole('option', { name: 'baz' }))
        await userEvent.click(screen.getByRole('button', { name: 'submit' }))
        await waitFor(() => {
          expect(onSubmit).toHaveBeenCalledWith({ test: 'baz' }, expect.anything())
        })
      })

      it('returns empty string when an empty value is selected', async () => {
        const onSubmit = jest.fn()
        render(<><Select name="test" options={['foo']} allowEmpty /><button type="submit">submit</button></>, { onSubmit })
        await userEvent.click(screen.getAllByRole('button')[0])
        await userEvent.click(screen.getAllByRole('option')[0])
        await userEvent.click(screen.getByRole('button', { name: 'submit' }))
        await waitFor(() => {
          expect(onSubmit).toHaveBeenCalledWith({ test: '' }, expect.anything())
        })
      })
    })

    describe('Select with multiple values', () => {
      it('ignore "allowEmpty" when "multiple" is enabled', async () => {
        render(<Select name="test" allowEmpty multiple options={['foo']} />)
        await userEvent.click(screen.getByRole('button'))
        expect(screen.queryByRole('option', { name: '' })).not.toBeInTheDocument()
        expect(screen.getAllByRole('option')).toHaveLength(1)
      })

      it('render initial value', () => {
        render(<Select multiple name="test" options={['foo', 'bar', 'baz']} />, { formValues: { test: ['foo', 'baz'] } })
        expect(screen.getByRole('textbox', { hidden: true })).toHaveDisplayValue('foo,baz')
      })

      it('render new value when changed', async () => {
        render(<Select multiple name="test" options={['foo', 'bar', 'baz']} />)
        await userEvent.click(screen.getByRole('button'))
        await userEvent.click(screen.getByRole('option', { name: 'bar' }))
        await userEvent.click(screen.getByRole('option', { name: 'baz' }))

        await waitFor(() => {
          expect(screen.getByRole('textbox', { hidden: true })).toHaveDisplayValue('bar,baz')
        })
      })

      it('save data on the form', async () => {
        const onSubmit = jest.fn()
        render(<><Select multiple name="test" options={['foo', 'bar', 'baz']} /><button type="submit">submit</button></>, { onSubmit })
        const submitButton = screen.getByRole('button', { name: 'submit' })
        await userEvent.click(screen.getAllByRole('button')[0])
        await userEvent.click(screen.getByRole('option', { name: 'foo' }))
        await userEvent.click(screen.getByRole('option', { name: 'bar' }))
        await userEvent.click(document.body)
        await waitFor(() => {
          expect(submitButton).toBeVisible()
        })
        await userEvent.click(submitButton)
        await waitFor(() => {
          expect(onSubmit).toHaveBeenCalledWith({ test: ['foo', 'bar'] }, expect.anything())
        })
      })

      it('returns an array even if only one item is selected', async () => {
        const onSubmit = jest.fn()
        render(<><Select multiple name="test" options={['foo', 'bar', 'baz']} /><button type="submit">submit</button></>, { onSubmit })
        const submitButton = screen.getByRole('button', { name: 'submit' })
        await userEvent.click(screen.getAllByRole('button')[0])
        await userEvent.click(screen.getByRole('option', { name: 'foo' }))
        await userEvent.click(document.body)
        await waitFor(() => {
          expect(submitButton).toBeVisible()
        })
        await userEvent.click(submitButton)
        await waitFor(() => {
          expect(onSubmit).toHaveBeenCalledWith({ test: ['foo'] }, expect.anything())
        })
      })
    })
  })
})
