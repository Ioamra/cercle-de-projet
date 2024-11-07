import { Router } from 'express';
import { addQuizResult, findAll, findOne } from '../controllers/quiz.controller';

const router = Router();

router.get('/', findAll);
router.get('/:id', findOne);
router.post('/addQuizResult/:id', addQuizResult);

export default router;
