const Services = require("./Services.js");

class TaskServices extends Services{
    constructor(){
        super("Task");
    }

    async getTasksFromUser(where={}, order=[]){
        const userTaskList = await this.getAll(where, order);
        return userTaskList;
    }
}

module.exports = TaskServices;