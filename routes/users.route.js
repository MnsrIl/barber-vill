const { Router } = require("express");
const { usersController } = require("../controllers/users.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = Router();

router.post("/signup", usersController.signup);
router.post("/login", usersController.login);
router.post("/logout", usersController.logout);
router.get("/profile", authMiddleware, usersController.getAuthorizedUser);
router.patch("/updateData", authMiddleware, usersController.updateUserDataBarber);

//routes for barbers
router.get("/barbers", usersController.getBarbers);
router.patch("/barbers/updateAvatar", authMiddleware, usersController.updateImage);
router.delete("/deleteAccount", authMiddleware, usersController.removeUser)

module.exports = router;