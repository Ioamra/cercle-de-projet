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
    const response = await request('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    return response;
  },
  register: async (username: string, email: string, password: string) => {
    const response = await request('/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }),
    });
    return response;
  },
};
