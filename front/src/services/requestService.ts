import { baseURL } from '../config/config';

export const request = async (url: string, options: RequestInit) => {
  const token = localStorage.getItem('auth-storage');
  if (token) {
    const parsedToken = JSON.parse(token)?.state?.token;
    if (parsedToken) {
      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${parsedToken}`,
      };
    }
  }

  const response = await fetch(`${baseURL}${url}`, options);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Request failed');
  }
  return response.json();
};
