import { Router } from 'express';
import { findAll, findOne } from '../controllers/quiz.controller';

const router = Router();

router.get('/', findAll);
router.get('/:id', findOne);

export default router;
