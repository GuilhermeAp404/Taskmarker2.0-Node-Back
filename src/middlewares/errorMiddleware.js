const {Sequelize} = require("sequelize");
const jwt = require("jsonwebtoken");
const BasicError = require("../errors/BasicError.js");
const JWTExpiredError = require("../errors/JWTExpiredError.js");
const JWTInvalidError = require("../errors/JWTInvalidError.js");
const ValidationError = require("../errors/ValidationError.js");
const DatabaseError = require("../errors/DatabaseError.js");

// eslint-disable-next-line no-unused-vars
function errorMiddleware(error, req, res, next) {
    if(error instanceof Sequelize.ValidationError){
        console.log(error);
        new ValidationError(error).sendError(res);
    }
    if(error instanceof Sequelize.DatabaseError){
        new DatabaseError().sendError(res);
    }
    if(error instanceof Sequelize.ConnectionError){
        new BasicError(error.message, 500).sendError(res);
    }
    if(error instanceof jwt.TokenExpiredError){
        new JWTExpiredError().sendError(res);
    }
    if(error instanceof jwt.JsonWebTokenError){
        new JWTInvalidError().sendError(res);
    }
    if(error instanceof TypeError){
        new BasicError(error.message, 500).sendError(res);
    }
    if(error instanceof BasicError){
        error.sendError(res);
    }
}

module.exports = errorMiddleware;