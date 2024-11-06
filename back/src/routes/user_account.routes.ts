import { Router } from 'express';
import { findOne, login, register } from '../controllers/user_account.controller';
import haveToken from '../middleware/haveToken.middleware';

const router = Router();

router.get('/:id', haveToken, findOne);
router.post('/register', register);
router.post('/login', login);

export default router;
