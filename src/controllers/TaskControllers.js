const TaskServices = require("../services/TaskServices.js");
const taskServices = new TaskServices();
const{Op} = require("sequelize");
const BasicError = require("../errors/BasicError.js");
const NotFoundError = require("../errors/NotFoundError.js");
const moment = require("moment-timezone");

class TaskControllers {
    constructor(){
        this.taskServices = taskServices;
    }

    async getAllTasks(req, res, next) {
        const userId = req.user;
        let where = {
            userId,
            start: {
                [Op.gte]:moment.utc().set({hour:0,minute:0,second:0,millisecond:0}).format(),
                [Op.lte]:moment.utc().add(6,"days").set({hour:0,minute:0,second:0,millisecond:0}).format()
            },
        };

        try {
            const {startIn} = req.query;
            if(startIn != null){
                where.start ={
                    [Op.gte]:moment.utc(startIn).set({hour:0,minute:0,second:0,millisecond:0}).format(),
                    [Op.lte]:moment.utc(startIn).add(6,"days").set({hour:0,minute:0,second:0,millisecond:0}).format()
                };
            }
            const order =[['start', 'ASC']]
            const taskList = await this.taskServices.getTasksFromUser(where, order);
            return res.status(200).json({tasks: taskList});
        } catch (error) {
            next(error);
        }
    }

    async createTask(req, res, next){
        const userId = req.user;
        const {title, description} = req.body;
        let {start, end} = req.body;
        try {
            if(!start){
                throw new BasicError("O campo da data de início precisa ser preenchido", 400);
            }
            if(!end){
                throw new BasicError("O campo da data de término precisa ser preenchido", 400);
            }
            start = moment.utc(start).format();
            end = moment.utc(end).format();
            if(start>end){
                throw new BasicError("A data de inicio precisa ser menor que a data de termino", 403);
            }
            const task = await this.taskServices.create({title, start, end, description, userId: userId});
            return res.status(201).json({message: "Tarefa criada com sucesso!", task: task});
        } catch (error) {
            next(error);
        }
    }

    async updateTask(req, res, next){
        const userId = req.user;
        const {id} = req.params;
        const taskUpdate={};
        try {
            const task = await this.taskServices.getOneById(Number(id));
            if(!task){
                throw new NotFoundError("Essa tarefa não foi encontrada");
            }
            if(task.userId !== Number(userId)){
                throw new BasicError("Você não pode atualizer essa tarefa", 403);
            }

            const {title, description, status} = req.body;
            if(title){
                taskUpdate.title=title;
            }
            if(description){
                taskUpdate.description=description;
            }
            if(status){
                taskUpdate.status=status;
            }

            let {start, end} = req.body;
            if(start){
                taskUpdate.start = moment.utc(start).format();
            }
            if(end){
                taskUpdate.end = moment.utc(end).format();
            }
            if(start>end){
                throw new BasicError("A data de inicio precisa ser menor que a data de termino", 403);
            }

            await this.taskServices.updateOne(taskUpdate, {id:task.id});

            return res.status(200).json({message: "Tarefa atualizada com sucesso!"});
        } catch (error) {
            next(error);
        }
    }

    async deleteTask(req, res, next){
        const userId = req.user;
        const {id} = req.params;
        try {
            const task = await this.taskServices.getOneById(Number(id));
            if(!task){
                throw new NotFoundError("Essa tarefa não foi encontrada");
            }
            if(task.userId !== Number(userId)){
                throw new BasicError("Você não pode deletar essa tarefa", 403);
            }
            await this.taskServices.deleteOne({id:task.id});
            return res.status(200).json({message: `A tarefe "${task.title}", foi deletada` });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = TaskControllers;