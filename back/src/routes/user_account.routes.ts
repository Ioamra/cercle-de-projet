import { Router } from 'express';
import {
  acceptFriend,
  findFriendLeaderboard,
  findLeaderboard,
  findOne,
  friendRequest,
  login,
  register,
  search,
} from '../controllers/user_account.controller';
import haveToken from '../middleware/haveToken.middleware';

const router = Router();

router.get('/:id', findOne);
router.get('/search/:search', search);
router.get('/leaderboard/:order', findLeaderboard);
router.get('/friend-leaderboard/:order', haveToken, findFriendLeaderboard);
router.post('/register', register);
router.post('/login', login);
router.post('/friend-request/:id', haveToken, friendRequest);
router.post('/accept-friend/:id', haveToken, acceptFriend);

export default router;
