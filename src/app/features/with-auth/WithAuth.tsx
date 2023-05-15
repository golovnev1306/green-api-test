import { FC, ReactNode, useLayoutEffect } from 'react';
import { useAuthStore } from '../../../store/auth/authStore';
import { getStatus } from '../../../store/auth/authStoreApi';
import { getInstanceData } from '../../../utils/localStorage';
import { PageSpinner } from '../../common/page-spinner/PageSpinner';
import { Auth } from '../../screen/auth/Auth';

interface IWithAuthProps {
  children?: ReactNode;
}

export const WithAuth: FC<IWithAuthProps> = ({ children }) => {
  const authorizeStatus = useAuthStore((state) => state.authorizeStatus);
  const isAuthorized = useAuthStore((state) => state.isAuthorized);

  useLayoutEffect(() => {
    const { apiTokenInstance, idInstance } = getInstanceData();

    if (apiTokenInstance == null || idInstance == null) {
      return;
    }

    getStatus();
  }, []);

  if (isAuthorized) {
    return <>{children}</>;
  }

  if (authorizeStatus === 'loading') {
    return <PageSpinner />;
  }

  return <Auth />;
};
