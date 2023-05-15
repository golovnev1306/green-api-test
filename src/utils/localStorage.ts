const idInstanceKey = 'idInstance';
const apiTokenInstanceKey = 'apiTokenInstance';

export const getInstanceData = () => {
  return {
    idInstance: localStorage.getItem(idInstanceKey),
    apiTokenInstance: localStorage.getItem(apiTokenInstanceKey),
  };
};

export const clearInstanceData = () => {
  localStorage.removeItem(idInstanceKey);
  localStorage.removeItem(apiTokenInstanceKey);
};

export const setInstanceData = (
  idInstance: string,
  apiTokenInstance: string,
) => {
  localStorage.setItem(idInstanceKey, idInstance);
  localStorage.setItem(apiTokenInstanceKey, apiTokenInstance);
};
