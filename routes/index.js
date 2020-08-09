const { Router } = require("express");
const Controller = require("../controllers");

const router = Router();
router.get("/", Controller.getRoot);

router.post("/user", Controller.createUser);

router.get("/users", Controller.getAllUsers);

router.get("/users/:id", Controller.getUser);

router.put("/users/:id", Controller.updateUser);

router.delete("/users/:id", Controller.deleteUser);

module.exports = router;
