import { Router } from 'express';
import { create, remove, update } from '../../controllers/admin/admin_quiz.controller';
import haveAdminToken from '../../middleware/haveAdminToken.middleware';

const router = Router();

router.post('/', haveAdminToken, create);
router.put('/:id', haveAdminToken, update);
router.delete('/:id', haveAdminToken, remove);

export default router;
