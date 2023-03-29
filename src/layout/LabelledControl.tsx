import { CustomizableLayout } from '@concrete-form/core'
import Grid from '@mui/material/Grid'
import { LabelledControlProps } from '../LabelledControl/LabelledControl'

export type LabelledControlLayoutProps = LabelledControlProps

const LabelledControl: React.FC<LabelledControlLayoutProps> = (props) => {
  const {
    control,
    label,
    labelPosition = 'top',
    mainGridProps,
    labelGridProps,
    controlGridProps,
  } = props

  const getMainGridDirection = () => {
    switch (labelPosition) {
      case 'top':
        return 'column'
      case 'bottom':
        return 'column-reverse'
      case 'right':
        return 'row-reverse'
    }
  }

  const getLabelGridPadding = () => {
    switch (labelPosition) {
      case 'top':
        return '0 0 8px 0'
      case 'bottom':
        return '8px 0 0 0'
      case 'left':
        return '8px 8px 8px 0'
      case 'right':
        return '8px 0 8px 8px'
    }
  }

  return (
    <CustomizableLayout
      type="labelledControl"
      props={props}
    >
      <Grid
        container
        data-testid="labelled-control"
        data-label-position={labelPosition}
        direction={getMainGridDirection()}
        {...mainGridProps}
        style={{ marginTop: 8, marginBottom: 8, ...mainGridProps?.style }}
      >
        <Grid
          item
          sm={6}
          xs={12}
          {...labelGridProps}
          style={{ padding: getLabelGridPadding(), ...labelGridProps?.style }}
        >
          { label }
        </Grid>

        <Grid
          item
          sm={6}
          xs={12}
          {...controlGridProps}
          style={{ padding: 0, ...controlGridProps?.style }}
        >
          { control }
        </Grid>
      </Grid>
    </CustomizableLayout>
  )
}

export default LabelledControl
