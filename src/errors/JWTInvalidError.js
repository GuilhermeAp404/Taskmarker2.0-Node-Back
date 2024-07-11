const BasicError = require("./BasicError.js");

class JWTInvalidError extends BasicError{
    constructor(message = "Token inválido, tente novamente."){
        super(message, 401);
    }
}

module.exports = JWTInvalidError;