const BasicError = require("./BasicError.js");

class JWTExpiredError extends BasicError{
    constructor(message = "O seu acesso expirou, faço login novament"){
        super(message, 401);
    }
}

module.exports = JWTExpiredError; 