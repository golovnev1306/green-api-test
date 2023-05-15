import { FC, forwardRef, InputHTMLAttributes } from 'react';
import './Input.scss';
import { mergeClasses } from '../../../utils/classnames';
import { FieldError } from 'react-hook-form';

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: FieldError;
}

export const Input: FC<IInputProps> = forwardRef<HTMLInputElement, IInputProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <input
        className={mergeClasses(
          'multiple--input',
          className,
          error != null && 'error',
        )}
        title={error?.message}
        ref={ref}
        {...props}
      />
    );
  },
);
