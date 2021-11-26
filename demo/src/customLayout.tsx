import React from 'react'

import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Grid from '@mui/material/Grid'

import {
  ControlLayoutProps,
  ErrorsLayoutProps,
  LabelLayoutProps,
  LabelledcontrolLayoutProps,
  ItemsGroupLayoutProps,
  ItemLabelLayoutProps,
} from '@concrete-form/mui/layout'

const Control: React.FC<ControlLayoutProps> = ({ name, control, errors, ...controlProps }) => (
  <div className="custom-control">
    <FormControl fullWidth {...controlProps} error={!!errors}>
      <div className="custom-control-control-wrapper">
        { control }
      </div>
      { errors && (
        <div className="custom-control-errors-wrapper">
          { errors }
        </div>
      ) }
    </FormControl>
  </div>
)

const Error: React.FC<ErrorsLayoutProps> = ({ errors }) => {
  return (
    <span className="custom-errors">
      { errors.join(', ') }
    </span>
  )
}

const ItemLabel: React.FC<ItemLabelLayoutProps> = ({
  control,
  label,
  labelPosition = 'right',
  ...formControlLabelProps
}) => {
  return (
    <div className="custom-item-label">
      <FormControlLabel
        control={control as React.ReactElement}
        label={(label ?? '') as React.ReactElement}
        data-testid="item-label"
        data-label-position={labelPosition}
        {...formControlLabelProps}
      />
    </div>
  )
}

const ItemsGroup: React.FC<ItemsGroupLayoutProps> = ({
  items,
  orientation = 'vertical',
  ...formGroupProps
}) => {
  return (
    <div className="custom-items-group">
      <FormGroup
        row={orientation === 'horizontal'}
        data-testid="group"
        data-orientation={orientation}
        {...formGroupProps}
      >
        { items }
      </FormGroup>
    </div>
  )
}

const Label: React.FC<LabelLayoutProps> = ({
  label,
  htmlFor,
  ...labelProps
}) => {
  return (
    <div className="custom-label">
      <FormLabel
        htmlFor={htmlFor}
        {...labelProps}
      >
        { label }
      </FormLabel>
    </div>
  )
}

const LabelledControl: React.FC<LabelledcontrolLayoutProps> = ({
  control,
  label,
  labelPosition = 'left',
  mainGridProps,
  labelGridProps,
  controlGridProps,
}) => {
  return (
    <div className="custom-labelled-control">
      <Grid
        container
        {...mainGridProps}
      >
        <Grid
          item
          sm={6}
          xs={12}
          {...labelGridProps}
        >
          { label }
        </Grid>

        <Grid
          item
          sm={6}
          xs={12}
          {...controlGridProps}
        >
          { control }
        </Grid>
      </Grid>
    </div>
  )
}

const layout = {
  control: Control,
  errors: Error,
  itemLabel: ItemLabel,
  itemsGroup: ItemsGroup,
  label: Label,
  labelledControl: LabelledControl,
}

export default layout
