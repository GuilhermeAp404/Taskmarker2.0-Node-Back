const BasicError = require("./BasicError.js");

class JWTInvalidError extends BasicError{
    constructor(message = "Acesso inválido"){
        super(message, 401);
    }
}

module.exports = JWTInvalidError;