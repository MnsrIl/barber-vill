const { Router } = require("express");
const authMiddleware = require("../middlewares/auth.middleware");

const router = Router();

router.use(require("./users.route"));

module.exports = router;