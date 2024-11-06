import { Router } from 'express';
import { findAll } from '../controllers/quiz_result.controller';

const router = Router();

router.get('/', findAll);

export default router;
