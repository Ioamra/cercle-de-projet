import { Router } from 'express';
import { create, remove, update } from '../../controllers/admin/admin_avatar.controller';
import haveAdminToken from '../../middleware/haveAdminToken.middleware';

const router = Router();

router.post('/create', haveAdminToken, create);
router.put('/update', haveAdminToken, update);
router.delete('/remove', haveAdminToken, remove);

export default router;
