import { APP_BASE_API } from '../config';
import axios from 'axios';
import { clearInstanceData, getInstanceData } from '../utils/localStorage';

export const request = axios.create({ baseURL: APP_BASE_API });

request.interceptors.request.use(async (request) => {
  const { idInstance, apiTokenInstance } = getInstanceData();
  if (idInstance == null || apiTokenInstance == null) {
    alert('Нет данных инстанса');
    window.location.reload();
  }
  return request;
});

request.interceptors.response.use(
  async (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 403) {
      clearInstanceData();
      alert('Ошибка использования инстанса');
      window.location.reload();
    }

    return Promise.reject(error);
  },
);

export const getUrlWithInstanceData = (action: string) => {
  const { idInstance, apiTokenInstance } = getInstanceData();
  return `waInstance${idInstance}/${action}/${apiTokenInstance}`;
};
