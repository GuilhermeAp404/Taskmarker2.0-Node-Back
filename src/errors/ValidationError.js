const BasicError = require("./BasicError.js");

class ValidationError extends BasicError{
    constructor(message = "Existem informações faltando e/ou dados incorretas, verifique e tente novamente"){
        super(message, 422);
    }
}

module.exports = ValidationError;