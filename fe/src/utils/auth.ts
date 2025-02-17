export const saveTokenToLS = (token: string) => {
  localStorage.setItem('token', token);
};

export const clearTokenFromLS = () => {
  localStorage.removeItem('token');
};

export const getTokenFromLS = () => {
  return localStorage.getItem('token') || '';
};
