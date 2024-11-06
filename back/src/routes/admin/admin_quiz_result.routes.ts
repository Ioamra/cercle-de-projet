import { Router } from 'express';
import { create, remove, update } from '../../controllers/admin/admin_quiz_result.controller';
import haveAdminToken from '../../middleware/haveAdminToken.middleware';

const router = Router();

router.post('/create', haveAdminToken, create);
router.put('/update/:id', haveAdminToken, update);
router.delete('/remove/:id', haveAdminToken, remove);

export default router;