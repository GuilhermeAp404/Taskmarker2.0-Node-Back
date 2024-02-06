const BasicError = require("./BasicError.js");

class ForbiddenError extends BasicError{
    constructor(message = "Você não pode excutar essa função aqui"){
        super(message, 403);
    }
}

module.exports = ForbiddenError;