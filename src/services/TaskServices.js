const Services = require("./Services.js");

class TaskServices extends Services{
    constructor(){
        super("Task");
        this.userServices = new Services("User");
    }

    async getTasksFromUser(id){
        const user = await this.userServices.getOneById(Number(id));
        const userTaskList = await user.getTaskFromUser({
            attributes:{exclude: ["userId", "createdAt", "updatedAt"]},
        });
        return userTaskList;
    }
}

module.exports = TaskServices;