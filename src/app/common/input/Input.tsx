import { FC, forwardRef, InputHTMLAttributes } from 'react';
import './Input.scss';
import { mergeClasses } from '../../../utils/classnames';
import { FieldError } from 'react-hook-form';

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: FieldError;
  // Отключить только изменение стейта не включая внешний вид
  disableOnChange?: boolean;
}

export const Input: FC<IInputProps> = forwardRef<HTMLInputElement, IInputProps>(
  ({ className, error, disableOnChange, onChange, ...props }, ref) => {
    return (
      <input
        className={mergeClasses(
          'multiple--input',
          className,
          error != null && 'error',
        )}
        title={error?.message}
        ref={ref}
        onChange={(e) => {
          if (!disableOnChange && onChange != null) {
            onChange(e);
          }
        }}
        {...props}
      />
    );
  },
);
