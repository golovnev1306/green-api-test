import { authService } from '../../transport/services/authService';
import { authStore } from './authStore';
import { storeApiHandler } from '../_utils/storeApiHandler';
import { EAuthStateInstance } from '../../interfaces/auth/Auth';
import { clearInstanceData } from '../../utils/localStorage';

export const getStatus = () => {
  const result = authService.getStatus();

  storeApiHandler({
    result,
    store: authStore,
    storeStatusProp: 'authorizeStatus',
    onSuccess: (res) => {
      if (res.data.stateInstance === EAuthStateInstance.Authorized) {
        authStore.setState({ isAuthorized: true });
        return;
      }

      alert('Аккаунт не готов к работе, пожалуйста, авторизуйтесь!');
      clearInstanceData();
    },
    onError() {
      alert('Вы указали неверные данные инстанса!');
      clearInstanceData();
    },
  });
};
