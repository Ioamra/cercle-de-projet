const baseURL = 'http://localhost:5000/api';

const request = async (url: string, options: RequestInit) => {
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

export const auth = {
  login: async (email: string, password: string) => {
    const response = await request('/user-account/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    return response;
  },
  register: async (email: string, pseudo: string, first_name: string, last_name: string, password: string, id_avatar: number) => {
    const response = await request('/user-account/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, pseudo, first_name, last_name, password, id_avatar }),
    });
    return response;
  },
};
