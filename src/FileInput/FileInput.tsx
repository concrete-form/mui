import {
  FileInputProps as CoreFileInputProps,
} from '@concrete-form/core'

import Input, { InputProps } from '../Input'

export type FileInputProps = CoreFileInputProps & Omit<InputProps, 'type'>

const FileInput: React.FC<FileInputProps> = ({
  ...inputProps
}) => <Input {...inputProps} type="file" value={undefined} defaultValue="" />

export default FileInput
