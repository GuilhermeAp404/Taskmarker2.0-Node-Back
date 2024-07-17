
"use strict";
const {Model} = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Task extends Model {
        static associate(models) {
            Task.belongsTo(models.User);
        }
    }
    Task.init({
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                len:{
                    args: [10, 30],
                    msg: "O titulo precisa ter de 10 a 30 caracteres"
                }
            }
        },
        status:{
            type: DataTypes.BOOLEAN,
        },
        userId:{
            allowNull:false,
            type: DataTypes.INTEGER,
            references: {model:"users", key:"id"},
            onDelete:"CASCADE"
        },
        start: {
            type: DataTypes.DATE,
            allowNull: false,
            validate:{
                isDate:{
                    args: true,
                    msg: "É necessário que a data de início esteja no formato correto."
                }
            }
        },
        end: {
            type: DataTypes.DATE,
            allowNull: false,
            validate:{
                isDate:{
                    args: true,
                    msg: "É necessário que a data de término esteja no formato correto."
                }
            }
        },
        description: DataTypes.STRING
    }, {
        sequelize,
        modelName: "Task",
        tableName: "tasks"
    });
    return Task;
};