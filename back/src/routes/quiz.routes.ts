import { Router } from 'express';
import { addQuizResult, findAll, findOne } from '../controllers/quiz.controller';
import haveToken from '../middleware/haveToken.middleware';

const router = Router();

router.get('/', findAll);
router.get('/:id', findOne);
router.post('/add-result/:id', haveToken, addQuizResult);

export default router;
