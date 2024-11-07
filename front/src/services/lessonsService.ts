import { apiServiceWithoutToken } from './requestService';

export async function getLessons() {
  try {
    const response = await apiServiceWithoutToken.get('/lessons');
    return response.data;
  } catch (error) {
    console.error('Error fetching lessons:', error);
    throw error;
  }
}
