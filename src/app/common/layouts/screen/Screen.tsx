import { FC, ReactNode } from 'react';
import './Screen.scss';
import { mergeClasses } from '../../../../utils/classnames';

interface IScreenProps {
  children: ReactNode;
  className?: string;
  title?: string;
  withTitle?: boolean;
}

export const Screen: FC<IScreenProps> = ({ title, className, children }) => {
  return (
    <main className={mergeClasses('multiple--screen', className)}>
      {title != null && <h1 className={'screen-title'}>{title}</h1>}
      {children}
    </main>
  );
};
