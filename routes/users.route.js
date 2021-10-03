const { Router } = require("express");
const { usersController } = require("../controllers/users.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = Router();

router.post("/signup", usersController.signup);
router.post("/login", usersController.login);
router.post("/logout", usersController.logout);
router.get("/profile", authMiddleware, usersController.getAuthorizedUser);
router.patch("/updateData", authMiddleware, usersController.updateUserDataBarber);
router.delete("/deleteAccount", authMiddleware, usersController.removeUser)

// router.get("/users",usersController.getUsers)
//routes for client
router.post('/clients/topUpBalance', authMiddleware, usersController.topUpBalance);

//routes for barbers
router.get("/barbers", usersController.getBarbers);
router.get("/barber/:id", usersController.getBarberById)
router.patch("/barbers/updateAvatar", authMiddleware, usersController.updateImage);
router.post("/barbers/addDescription", authMiddleware, usersController.addDescriptionToBarber);

module.exports = router;