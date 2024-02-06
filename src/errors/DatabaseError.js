
class DatabaseError extends Error{
    constructor(message = "Ocorreu um erro em nossa base de dados, tente novamente", status = 500){
        super();
        this.message = message;
        this.status = status;
    }

    sendError(res) {
        return res.status(this.status).json({message: this.message, status: this.status});
    }
}

module.exports = DatabaseError;