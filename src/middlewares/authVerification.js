const jwt = require("jsonwebtoken");
const BasicError = require("../errors/BasicError");

const authVerification = async (req, res, next) =>{
    try{
        if(!req.headers.authorization){
            throw new BasicError("Você não tem autorização para acessar essa rota");
        }
        const [, token] = req.headers.authorization.split(" ");

        const payload = await jwt.verify(token, process.env["PRIVATE_KEY"]);
        req.user = payload.id;
        next();
    }catch(error){
        next(error);
    }
};

module.exports = authVerification;