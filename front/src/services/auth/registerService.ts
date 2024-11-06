import { request } from '../requestService';

export const register = async (email: string, pseudo: string, first_name: string, last_name: string, password: string, id_avatar: number) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');

  const response = await request('/user-account/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      pseudo,
      first_name,
      last_name,
      password: hashHex,
      id_avatar,
    }),
  });
  return response;
};
