import { ItemLabelLayoutProps, CustomizableLayout } from '@concrete-form/core'
import FormControlLabel from '@mui/material/FormControlLabel'
import { ReactElement } from 'react'

const ItemLabel: React.FC<ItemLabelLayoutProps> = (props) => {
  const {
    control,
    label,
    labelPosition = 'right',
    ...formControlLabelProps
  } = props

  const getLabelPlacement = () => {
    switch (labelPosition) {
      case 'top':
        return 'top'
      case 'bottom':
        return 'bottom'
      case 'left':
        return 'start'
      case 'right':
      default:
        return 'end'
    }
  }

  return (
    <CustomizableLayout type="itemLabel" props={props}>
      <FormControlLabel
        control={control as ReactElement}
        label={(label ?? '') as ReactElement}
        labelPlacement={getLabelPlacement()}
        data-testid="item-label"
        data-label-position={labelPosition}
        {...formControlLabelProps}
      />
    </CustomizableLayout>
  )
}

export default ItemLabel
