import { ButtonHTMLAttributes, FC, ReactNode } from 'react';
import './Button.scss';
import { mergeClasses } from '../../../utils/classnames';

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  colorType?: 'primary' | 'secondary';
}

export const Button: FC<IButtonProps> = ({
  className,
  children,
  colorType = 'primary',
  ...props
}) => {
  return (
    <button
      className={mergeClasses('multiple--button', className, colorType)}
      {...props}
    >
      {children}
    </button>
  );
};
