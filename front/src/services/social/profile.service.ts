import { Avatar } from '../../models/avatar.model';
import { UserAccount } from '../../models/userAccount.model';
import { apiService, apiServiceWithoutToken } from '../request.service';

export async function getOneUserAccount(id: number): Promise<UserAccount.IUserAccountWithRecentActivity> {
  try {
    const response = await apiServiceWithoutToken.get('/user-account/' + id);
    return response.data;
  } catch (error) {
    console.error('Error fetching lessons:', error);
    throw error;
  }
}

export async function friendRequest(id: number): Promise<{ message: string }> {
  try {
    const response = await apiService.post('/user-account/friend-request/' + id);
    return response.data;
  } catch (error) {
    console.error('Error fetching lessons:', error);
    throw error;
  }
}

export async function acceptFriend(id: number): Promise<{ message: string }> {
  try {
    const response = await apiService.put('/user-account/accept-friend/' + id);
    return response.data;
  } catch (error) {
    console.error('Error fetching lessons:', error);
    throw error;
  }
}

export async function searchUserAccount(search: string): Promise<UserAccount.IUserAccount[]> {
  try {
    const response = await apiServiceWithoutToken.get('/user-account/search/' + search);
    return response.data;
  } catch (error) {
    console.error('Error fetching lessons:', error);
    throw error;
  }
}

export async function getAllAvatar(): Promise<Avatar.IAvatar[]> {
  try {
    const response = await apiServiceWithoutToken.get('/avatar/');
    return response.data;
  } catch (error) {
    console.error('Error fetching lessons:', error);
    throw error;
  }
}

export async function getListAskingToBeFriend(): Promise<UserAccount.IUserAccount[]> {
  try {
    const response = await apiService.get('/user-account/list-ask-to-be-friend');
    return response.data;
  } catch (error) {
    console.error('Error fetching lessons:', error);
    throw error;
  }
}

export async function getListWantToAddMe(): Promise<UserAccount.IUserAccount[]> {
  try {
    const response = await apiService.get('/user-account/list-want-to-add-me');
    return response.data;
  } catch (error) {
    console.error('Error fetching lessons:', error);
    throw error;
  }
}
