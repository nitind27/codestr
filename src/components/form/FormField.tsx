import { type FieldError, type UseFormRegisterReturn } from 'react-hook-form';
import { Input, type InputProps } from '@components/ui/Input';
import { Select, type SelectProps } from '@components/ui/Select';

interface FormInputProps extends Omit<InputProps, 'error'> {
  registration: UseFormRegisterReturn;
  error?: FieldError;
}

interface FormSelectProps extends Omit<SelectProps, 'error'> {
  registration: UseFormRegisterReturn;
  error?: FieldError;
}

/** Wraps Input with react-hook-form registration */
export function FormInput({ registration, error, ...props }: FormInputProps) {
  return <Input {...props} {...registration} error={error?.message} />;
}

/** Wraps Select with react-hook-form registration */
export function FormSelect({ registration, error, ...props }: FormSelectProps) {
  return <Select {...props} {...registration} error={error?.message} />;
}
