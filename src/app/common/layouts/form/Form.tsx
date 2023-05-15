import { FC, FormHTMLAttributes, ReactNode } from 'react';
import './Form.scss';
import { mergeClasses } from '../../../../utils/classnames';

interface IFormProps extends FormHTMLAttributes<HTMLFormElement> {
  children: ReactNode;
}

export const Form: FC<IFormProps> = ({ className, ...props }) => {
  return (
    <form className={mergeClasses(className, 'multiple--form')} {...props} />
  );
};
