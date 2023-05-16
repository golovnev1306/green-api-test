export const getTimeFromTimestamp = (timestamp: number) => {
  const date = new Date(timestamp);
  let hours: number | string = date.getHours();
  let minutes: number | string = date.getMinutes();

  if (hours < 10) hours = '0' + hours;
  if (minutes < 10) minutes = '0' + minutes;

  return hours + ':' + minutes;
};

export const toServerTimestamp = (clientTimestamp: number) => {
  return clientTimestamp / 1000;
};

export const toClientTimestamp = (serverTimestamp: number) => {
  return serverTimestamp * 1000;
};
