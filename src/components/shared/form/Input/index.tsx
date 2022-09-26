import {  Controller } from 'react-hook-form'
import { InputBaseProps, InternalStandardProps as StandardProps } from '@mui/material'
import OutlinedInput from '@mui/material/OutlinedInput';

interface Props extends StandardProps<InputBaseProps> {
  control: any
  name: string
  defaultValue: string
  label: string
}

export function Input({ defaultValue, name, label, control, ...rest }: Props): JSX.Element {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={({ field }) => <OutlinedInput label={label} {...rest} {...field} />}
    />
  )
}
