const router = require("express").Router();
const UserController = require('./../controllers/user_controller.js');

router.post("/register",UserController.register);
router.post("/login", UserController.login);
router.put("/update", UserController.update);


module.exports = router;