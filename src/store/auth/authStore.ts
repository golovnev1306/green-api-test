import createHook from 'zustand';
import createStore from 'zustand/vanilla';
import { ScreenStatus } from '../../interfaces/_common/common';

export interface IAuthStore {
  isAuthorized: boolean;
  authorizeStatus: ScreenStatus;
}

export const authStore = createStore<IAuthStore>(() => ({
  isAuthorized: false,
  authorizeStatus: 'ok',
}));

export const useAuthStore = createHook(authStore);
