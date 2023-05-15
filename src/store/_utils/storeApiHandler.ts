import { StoreApi } from 'zustand';
import { ScreenStatus } from '../../interfaces/_common/common';

interface IStoreApiHandler<Store, Response> {
  result: Promise<Response>;
  store: StoreApi<Store>;
  storeStatusProp: keyof Store;
  onSuccess?: (responseData: Response) => void;
  onError?: (err: unknown) => void;
}

export const storeApiHandler = <Store, Response>(
  params: IStoreApiHandler<Store, Response>,
) => {
  const {
    store,
    storeStatusProp,
    result,
    onSuccess = () => void 0,
    onError = () => void 0,
  } = params;

  const setStatus = (status: ScreenStatus) => {
    store.setState({
      [storeStatusProp]: status,
    } as any);
  };

  setStatus('loading');

  return result
    .then((response) => {
      onSuccess(response);
      setStatus('ok');
    })
    .catch((err) => {
      onError(err);
      setStatus('error');
    });
};
