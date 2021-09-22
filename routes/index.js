const { Router } = require("express");
const authMiddleware = require("../middlewares/auth.middleware");

const router = Router();

router.use(require("./users.route"));
router.use(require("./hairstyles.route"))

module.exports = router;