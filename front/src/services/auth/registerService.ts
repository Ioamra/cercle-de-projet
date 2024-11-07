import CryptoJS from 'crypto-js';
import { apiServiceWithoutToken } from '../requestService';

export const register = async (email: string, pseudo: string, first_name: string, last_name: string, password: string, id_avatar: number) => {
  try {
    const response = await apiServiceWithoutToken.post('/user-account/register', {
      email,
      pseudo,
      first_name,
      last_name,
      password: CryptoJS.SHA256(password).toString(),
      id_avatar,
    });
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
    localStorage.setItem('date_of_connection', new Date().toISOString());
    return 'ok';
  } catch (error) {
    return { error };
  }
};
