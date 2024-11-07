import CryptoJS from 'crypto-js';
import { apiServiceWithoutToken } from '../request.service';

export const login = async (email: string, password: string) => {
  try {
    const response = await apiServiceWithoutToken.post('/user-account/login', {
      email: email,
      password: CryptoJS.SHA256(password).toString(),
    });
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
    localStorage.setItem('date_of_connection', new Date().toISOString());
    return 'ok';
  } catch (error) {
    return { error };
  }
};
