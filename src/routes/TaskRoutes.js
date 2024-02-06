const {Router} = require("express");
const authVerification = require("../middlewares/authVerification.js");
const TaskControllers = require("../controllers/TaskControllers.js");

const taskControllers = new TaskControllers();

const router = Router();

router
    .post("/tasks/create", authVerification, (req, res, next)=>taskControllers.createTask(req, res, next))
    .put("/tasks/:id/", authVerification, (req, res, next)=>taskControllers.updateTask(req, res, next))
    .delete("/tasks/:id/", authVerification, (req, res, next)=>taskControllers.deleteTask(req, res, next))
    .get("/tasks/all", authVerification, (req, res, next)=>taskControllers.getAllTasks(req, res, next));

module.exports = router;