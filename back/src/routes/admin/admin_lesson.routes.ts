import { Router } from 'express';
import { create, remove, update } from '../../controllers/admin/admin_lesson.controller';

const router = Router();

router.post('/create', create);
router.put('/update', update);
router.delete('/remove', remove);

export default router;
