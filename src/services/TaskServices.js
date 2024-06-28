const Services = require("./Services.js");

class TaskServices extends Services{
    constructor(){
        super("Task");
    }

    async getTasksFromUser(where={}){
        const userTaskList = await this.getAll(where);
        return userTaskList;
    }
}

module.exports = TaskServices;