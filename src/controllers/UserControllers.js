const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserServices = require("../services/UserServices.js");
const userServices = new UserServices();

//erros
const NotFoundError = require("../errors/NotFoundError.js");
const BasicError = require("../errors/BasicError.js");
const ValidationError = require("../errors/ValidationError.js");

class UserControllers{
    constructor(){
        this.userServices = userServices;
    }

    async getUser(req, res, next){
        const userId = req.user;
        try {
            const user = await this.userServices.getOne(
                {
                    where: {id:Number(userId)},
                    attributes: {exclude: ["password"]}
                }
            );

            if(user === null){
                throw new NotFoundError();
            }
            return res.status(200).json({user});
        } catch (error) {
            next(error);
        }
    }

    async registerUser(req, res, next){
        const userData = req.body;
        try {
            if(!userData.password.length>=8 && userData.password !=null){
                throw new ValidationError("A senha precisa seguir o padrão imposto, por isso não foi possivel completar a ação");
            }
            userData.password = await bcrypt.hash(userData.password, 15);
            await this.userServices.create(userData);
            return res.status(201).json({message: "Usuário criado com sucesso!"});
        } catch (error) {
            next(error);
        }
    }

    async login(req, res, next){
        try {
            if(!req.headers.authorization){
                throw new BasicError("As credencias de acesso, são necessarias", 400);
            }
            const [, hash] = req.headers.authorization.split(" ");
            const [username, password] = Buffer.from(hash, "base64").toString().split(":");

            const user = await this.userServices.getOne({username: username});
            
            //verifica se o usuario foi encontrado
            if(user === null){
                throw new NotFoundError("Não existe um usuario cadastrado com esse nome");
            }
            
            //verifica se a senha está correta
            const pwdMatch = await bcrypt.compare(password, user.password);
            if(!pwdMatch){
                throw new BasicError("Senha incorreta", 401);
            }

            //cria e envia o token caso tenha passado pela validação
            const token = jwt.sign(
                {
                    id: user.id,
                }, 
                process.env["PRIVATE_KEY"],
                {expiresIn: "1h"}
            );
            return res.status(200).json({auth:true, token:token});
        } catch (error) {
            next(error);
        }
    }

    async updateUser(req, res, next){
        const userId = req.user;
        const userUpdateData = req.body;
        try {
            if(!userUpdateData.password || !userUpdateData.passwordConfirm){
                throw new BasicError("Você precisa da senha e da confirmação de senha para realizar essa função", 400);
            }

            const user = await this.userServices.getOneById(Number(userId));
            if(user === null){
                throw new NotFoundError();
            }
            
            if(userUpdateData.password !== userUpdateData.passwordConfirm){
                throw new BasicError("A senhas não coincedem, tente novamente", 403);
            }
            const pwdMatch = await bcrypt.compare(userUpdateData.password, user.password);
            if(!pwdMatch){
                throw new BasicError("A senha informada não combina com a do usuário atual", 403);
            }
            
            //remove do objeto os atributos que não podem ser utilizados no Update
            delete userUpdateData.password; 
            delete userUpdateData.passwordConfirm;

            await this.userServices.updateOne(userUpdateData, {id:userId});
            return res.status(200).json({message: `${user.username}, foi atualizado com sucesso!`});
        } catch (error) {
            next(error);
        }
    }

    async deleteUser(req, res, next){
        const userId = req.user;
        const userDeleteData = req.body;
        
        try {
            if(!userDeleteData.password || !userDeleteData.passwordConfirm){
                throw new BasicError("Você precisa da senha e da confirmação de senha para realizar essa função", 400);
            }

            const user = await this.userServices.getOneById(Number(userId));
            if(user === null){
                throw new NotFoundError();
            }

            if(userDeleteData.password !== userDeleteData.passwordConfirm){
                throw new BasicError("A senhas não coincedem, tente novamente", 403);
            }

            const pwdMatch = await bcrypt.compare(userDeleteData.password, user.password);
            if(!pwdMatch){
                throw new BasicError("A senha informada não combina com a do usuário atual", 403);
            }

            await this.userServices.deleteOne({id: Number(userId)});
            return res.status(200).json({message: `${user.username}, foi deletado com sucesso!`});
        } catch (error) {
            next(error);
        }
    }
}   

module.exports=UserControllers;