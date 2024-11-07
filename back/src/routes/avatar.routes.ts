import { Router } from 'express';
import { findAll } from '../controllers/avatar.controller';

const router = Router();

router.get('/', findAll);

export default router;
