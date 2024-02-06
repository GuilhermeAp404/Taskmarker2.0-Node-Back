"use strict";
const {Model} = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            User.hasMany(models.Task, {
                as: "taskFromUser",
                foreignKey: "userId",
                onDelete: "CASCADE"
            });
        }
    }
    User.init({
        name: {
            type: DataTypes.STRING,
            allowNull:false,
            validate:{
                len:{
                    args: [8, 80],
                    msg: "O nome não foi enviado da maneira correta"
                }
            },
        },
        username: {
            type: DataTypes.STRING,
            allowNull:false,
            unique: true,
            validate:{
                len:{
                    args:[8,24],
                    msg: "O username não foi enviado da maneira correta"
                }
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull:false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull:false,
            unique: true,
            validate:{
                isEmail:{
                    args: true,
                    msg: "O e-mail não está no formato correto"
                }
            }
        }
    }, {
        sequelize,
        modelName: "User",
        tableName: "users"
    });
    return User;
};