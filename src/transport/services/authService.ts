import { getUrlWithInstanceData, request } from '../index';
import { EAuthStateInstance } from '../../interfaces/auth/Auth';

interface GetStatusRes {
  stateInstance: EAuthStateInstance;
}

export const authService = {
  getStatus() {
    return request.get<GetStatusRes>(
      getUrlWithInstanceData('getStateInstance'),
    );
  },
};
