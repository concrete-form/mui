export const fixMuiLabelPosition = (orientation = 'vertical', labelPosition = 'right') => {
  if (orientation !== 'vertical') {
    return {}
  }

  const group: Record<string, any> = { alignItems: 'flex-start' }
  const item: Record<string, any> = {}
  const input: Record<string, any> = {}

  if (labelPosition !== 'right') {
    item.marginLeft = 0
  }
  if (['top', 'bottom'].includes(labelPosition)) {
    item.alignItems = 'flex-start'
    input.marginLeft = -11
  }
  return { group, item, input }
}
