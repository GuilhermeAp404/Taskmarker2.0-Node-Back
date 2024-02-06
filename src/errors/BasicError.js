
class BasicError extends Error{
    constructor(message = "Erro interno do servidor, tente novamente mais tarde", status = 500){
        super();
        this.message = message;
        this.status = status;
    }

    sendError(res) {
        return res.status(this.status).json({message: this.message, status: this.status});
    }
}

module.exports = BasicError;