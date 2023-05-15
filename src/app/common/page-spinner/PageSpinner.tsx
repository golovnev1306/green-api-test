import { FC } from 'react';
import './PageSpinner.scss';

export const PageSpinner: FC = () => {
  return (
    <div className="multiple--page-spinner">
      <div className={'page-spinner-spinner'}></div>
    </div>
  );
};
