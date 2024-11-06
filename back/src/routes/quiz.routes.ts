import { Router } from 'express';
import { findAll } from '../controllers/quiz.controller';

const router = Router();

router.get('/', findAll);

export default router;
