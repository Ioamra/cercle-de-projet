const { Router } = require("express");
const { getAll } = require("../controllers/quiz.controller");

const router = Router();

router.get("/getAll", getAll);

module.exports = router;
