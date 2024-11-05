const { Router } = require("express");
const { getAll } = require("../controllers/quiz_result.controller");

const router = Router();

router.get("/getAll", getAll);

module.exports = router;
