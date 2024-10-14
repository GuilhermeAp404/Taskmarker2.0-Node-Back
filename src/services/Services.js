const dataSource = require("../database/models");

class Services {
    constructor(modelName){
        this.model = modelName;
    }

    async getAll(where={}, order=[]){
        return await dataSource[this.model].findAll({where:{...where}, order:order});
    }

    async getOneById(id){
        return await dataSource[this.model].findByPk(id);
    }

    async getOne(options = {}){
        return await dataSource[this.model].findOne({...options});
    }

    async create(data){
        return await dataSource[this.model].create(data);
    }

    async updateOne(data, where={}){
        return await dataSource[this.model].update(data,{
            where: {...where}
        });
    }

    async deleteOne(where ={}){
        return await dataSource[this.model].destroy({where: {...where}});
    }

}

module.exports=Services;