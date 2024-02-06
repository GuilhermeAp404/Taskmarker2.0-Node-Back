const BasicError = require("./BasicError.js");

class NotFoundError extends BasicError{
    constructor(message = "Recurso não encontrado"){
        super(message,404);
    }
}

module.exports = NotFoundError;