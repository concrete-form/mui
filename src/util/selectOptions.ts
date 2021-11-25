import { parseSelectOptions } from '@concrete-form/core'

type Options = ReturnType<typeof parseSelectOptions>

export function flattenOptions<T extends Options> (options: T): T {
  let flatOptions: any[] = []
  options.forEach((option: any) => {
    flatOptions.push(option)
    if (option?.options) {
      flatOptions = [...flatOptions, ...flattenOptions(option.options)]
    }
  })
  return flatOptions as T
}

export function getFirstValue<T extends Options> (parsedOptions: T): any {
  /* mui doesn't always exclude disabled optgroup */
  /* https://github.com/mui-org/material-ui/issues/29853 */

  const enabledItems = flattenOptions(parsedOptions.filter(({ props }: Record<string, any>) => props?.disabled !== true))
  const firstOption = enabledItems.find(({ type, props }: Record<string, any>) => type === 'option' && !props?.disabled)

  return (firstOption as any)?.value ?? undefined
}
