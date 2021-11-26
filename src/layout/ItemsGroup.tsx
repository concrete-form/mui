import {
  ItemsGroupLayoutProps as CoreItemsGroupLayoutProps,
  CustomizableLayout,
} from '@concrete-form/core'
import FormGroup, { FormGroupProps } from '@mui/material/FormGroup'

export type ItemsGroupLayoutProps = CoreItemsGroupLayoutProps & FormGroupProps

const ItemsGroup: React.FC<ItemsGroupLayoutProps> = (props) => {
  const {
    items,
    orientation = 'vertical',
    ...formGroupProps
  } = props

  return (
    <CustomizableLayout type="itemsGroup" props={props}>
      <FormGroup
        row={orientation === 'horizontal'}
        data-testid="group"
        data-orientation={orientation}
        {...formGroupProps}
      >
        { items }
      </FormGroup>
    </CustomizableLayout>
  )
}

export default ItemsGroup
