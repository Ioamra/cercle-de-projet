import { Router } from 'express';
import { findAll } from '../controllers/lesson.controller';

const router = Router();

router.get('/', findAll);

export default router;
