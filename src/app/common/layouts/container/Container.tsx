import { FC, ReactNode } from 'react';
import './Container.scss';
import { mergeClasses } from '../../../../utils/classnames';

interface IContainerProps {
  children: ReactNode;
  className?: string;
}

export const Container: FC<IContainerProps> = ({ children, className }) => {
  return (
    <div className={mergeClasses('multiple--container', className)}>
      {children}
    </div>
  );
};
