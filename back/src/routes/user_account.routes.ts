import { Router } from 'express';
import {
  acceptFriend,
  findAllFriend,
  findFriendLeaderboard,
  findLeaderboard,
  findOne,
  friendRequest,
  login,
  register,
} from '../controllers/user_account.controller';
import haveToken from '../middleware/haveToken.middleware';

const router = Router();

router.get('/', haveToken, findAllFriend);
router.get('/:id', haveToken, findOne);
router.get('/leaderboard/:order', findLeaderboard);
router.get('/friend-leaderboard/:order', haveToken, findFriendLeaderboard);
router.post('/register', register);
router.post('/login', login);
router.post('/friend-request/:id', friendRequest);
router.post('/accept-friend/:id', acceptFriend);

export default router;
