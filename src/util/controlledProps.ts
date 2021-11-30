import {
  removeEventHandlers,
  extractEventHandlers,
  mergeEventHandlers,
} from '@concrete-form/core'

type AnyProps = Record<string, any>

/**
 * 1) This remove event handler and ref from form handler
 * 2) This preserv custom event handler
 * 3) this merged controlled event handler with custom event handler
 */
export const getControlledProps = (props: AnyProps, inputProps: AnyProps, eventHandler: AnyProps) => {
  const mergedEvents = Object.fromEntries(
    Object.entries(eventHandler)
      .map(([eventName, eventHandler]) => [eventName, mergeEventHandlers(inputProps[eventName], eventHandler)]),
  )

  return {
    ...removeEventHandlers(props),
    ...extractEventHandlers(inputProps),
    ...mergedEvents,
    ref: undefined,
    value: undefined,
    defaultValue: undefined,
    checked: undefined,
    defaultChecked: undefined,
  }
}
