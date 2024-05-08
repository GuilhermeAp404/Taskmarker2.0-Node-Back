const {Router} = require("express");
const authVerification = require("../middlewares/authVerification.js");
const UserControllers = require("../controllers/UserControllers.js");

const userControllers = new UserControllers();

const router = Router();

router
    .get("/user", authVerification, (req, res, next)=> userControllers.getUser(req, res, next))
    .post("/user/login", (req, res, next)=>userControllers.login(req, res, next))
    .post("/user/register", (req, res, next)=>userControllers.registerUser(req, res, next))
    .put("/user/update", authVerification, (req, res, next)=>userControllers.updateUser(req, res, next))
    .delete("/user/delete", authVerification, (req, res, next)=>userControllers.deleteUser(req, res, next));

module.exports = router;