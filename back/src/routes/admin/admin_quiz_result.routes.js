const { Router } = require("express");
const { create, remove, update } = require("../../controllers/admin/admin_quiz_result.controller");

const router = Router();

router.post("/create", create);
router.put("/update", update);
router.delete("/remove", remove);

module.exports = router;
