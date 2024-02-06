const express = require("express");
const users = require("./UserRoutes.js");
const task = require("./TaskRoutes.js");

module.exports = (app)=>{
    app.use(
        express.json(),
        users,
        task
    );
};