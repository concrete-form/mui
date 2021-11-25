import { ItemsGroupLayoutProps, CustomizableLayout } from '@concrete-form/core'
import FormGroup from '@mui/material/FormGroup'

const ItemsGroup: React.FC<ItemsGroupLayoutProps> = (props) => {
  const {
    items,
    orientation = 'vertical',
    ...formGroupProps
  } = props

  /* MUI align items in middle by default */
  // const getOrientationStyle = () => {
  //   if (orientation === 'vertical') {
  //     return { alignItems: 'flex-start' }
  //   }
  // }

  return (
    <CustomizableLayout type="itemsGroup" props={props}>
      <FormGroup
        row={orientation === 'horizontal'}
        // style={getOrientationStyle()}
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
