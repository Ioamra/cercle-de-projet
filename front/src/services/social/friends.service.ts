import { UserAccount } from '../../models/userAccount.model';
import { apiService } from '../request.service';

export async function getFriendLeaderboard(order?: 'avg_note' | 'nb_quiz_make' | 'total_note'): Promise<UserAccount.IUserAccount[]> {
  try {
    if (order === undefined) {
      order = 'total_note';
    }
    const response = await apiService.get('/user-account/friend-leaderboard/' + order);
    return response.data;
  } catch (error) {
    console.error('Error fetching lessons:', error);
    throw error;
  }
}
