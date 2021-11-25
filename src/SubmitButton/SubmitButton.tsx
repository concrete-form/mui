import {
  SubmitButtonProps as CoreSubmitButtonProps,
  useFormState,
} from '@concrete-form/core'
import Button, { ButtonProps } from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'

type PartialButtonProps = Omit<ButtonProps, 'type'|'href'|'LinkComponent'|'onSubmit'>

export type SubmitButtonProps = CoreSubmitButtonProps & PartialButtonProps

const SubmitButton: React.FC<SubmitButtonProps> = ({
  displayLoading = true,
  loadingComponent = <CircularProgress data-testid="spinner" size="1rem" style={{ marginLeft: '0.5rem' }} />,
  alternateLoadingContent,
  children,
  ...buttonProps
}) => {
  const { isSubmitting, hasErrors } = useFormState()

  const render = () => {
    if (isSubmitting && alternateLoadingContent) {
      return alternateLoadingContent
    }
    return (
      <>
        { children }
        { isSubmitting && displayLoading && loadingComponent }
      </>
    )
  }

  return (
    <Button
      disabled={isSubmitting || hasErrors}
      color="primary"
      variant="contained"
      {...buttonProps}
      type="submit"
    >
      { render() }
    </Button>
  )
}

export default SubmitButton
