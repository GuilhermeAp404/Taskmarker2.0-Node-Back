/* eslint-disable no-unused-vars */
"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("tasks", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            title: {
                allowNull: false,
                type: Sequelize.STRING
            },
            status:{
                type: Sequelize.BOOLEAN
            },
            start: {
                allowNull: false,
                type: Sequelize.DATE
            },
            end: {
                allowNull: false,
                type: Sequelize.DATE
            },
            description: {
                type: Sequelize.STRING
            },
            userId:{
                allowNull:false,
                type: Sequelize.INTEGER,
                references: {model:"users", key:"id"},
                onDelete:"CASCADE"
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("tasks");
    }
};