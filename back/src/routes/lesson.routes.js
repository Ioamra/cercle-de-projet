const { Router } = require("express");
const { getAll } = require("../controllers/lesson.controller");

const router = Router();

router.get("/getAll", getAll);

module.exports = router;
