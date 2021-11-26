import React from 'react'
import {
  ItemLabelLayoutProps as CoreItemLabelLayoutProps,
  CustomizableLayout,
} from '@concrete-form/core'
import FormControlLabel, { FormControlLabelProps } from '@mui/material/FormControlLabel'

type PartialFormControlLabelProps = Omit<FormControlLabelProps, 'control'|'label'|'checked'|'inputRef'|'labelPlacement'|'value'>

export type ItemLabelLayoutProps = CoreItemLabelLayoutProps & PartialFormControlLabelProps

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
        control={control as React.ReactElement}
        label={(label ?? '') as React.ReactElement}
        labelPlacement={getLabelPlacement()}
        data-testid="item-label"
        data-label-position={labelPosition}
        {...formControlLabelProps}
      />
    </CustomizableLayout>
  )
}

export default ItemLabel
