const BasicError = require("./BasicError.js");

class ValidationError extends BasicError{
    constructor(error){
        const errorMessage = Object.values(error.errors)
            .map(err=>err.message)
            .join(";");
        super(errorMessage, 422);
    }
}

module.exports = ValidationError;