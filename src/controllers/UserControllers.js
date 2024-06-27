const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserServices = require("../services/UserServices.js");
const userServices = new UserServices();

//erros
const NotFoundError = require("../errors/NotFoundError.js");
const BasicError = require("../errors/BasicError.js");

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
        const {name, username, password, email} = req.body;
        try {
            if(!password){
                throw new BasicError("O campo de senha não foi preenchido", 422);
            }
            if(!password.length>=8){
                throw new BasicError("A senha não segue o padrão deseja, tente novamente!", 422);
            }
            const hashPassword = await bcrypt.hash(password, 15);
            await this.userServices.create({name, username, password: hashPassword, email});
            return res.status(201).json({message: "Usuário criado com sucesso!"});
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    async login(req, res, next){
        try {
            const {username, password} = req.body;

            if(!username){
                throw new BasicError("O campo nome é necessário para o login");
            }

            if(!password){
                throw new BasicError("O campo senha é necessário para o login");
            }

            const user = await this.userServices.getOne({where: {username: username}});

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
        const {name, username, password, passwordConfirm, email} = req.body;
        const userUpdate = {};
        try {
            if(!password || !passwordConfirm){
                throw new BasicError("Você precisa da senha e da confirmação de senha para realizar essa função", 400);
            }

            const user = await this.userServices.getOneById(Number(userId));
            if(user === null){
                throw new NotFoundError();
            }

            if(password !== passwordConfirm){
                throw new BasicError("A senhas não coincedem, tente novamente", 403);
            }
            const pwdMatch = await bcrypt.compare(password, user.password);
            if(!pwdMatch){
                throw new BasicError("A senha informada não combina com a do usuário atual", 403);
            }

            //verifica quais os campos que vão ser alterados
            if(name){
                userUpdate.name = name;
            }
            if(username){
                userUpdate.username = username;
            }
            if(email){
                userUpdate.email = email;
            }

            await this.userServices.updateOne(userUpdate, {id:userId});
            return res.status(200).json({message: `${user.username}, foi atualizado com sucesso!`});
        } catch (error) {
            next(error);
        }
    }

    async deleteUser(req, res, next){
        const userId = req.user;
        const {password, passwordConfirm} = req.body;

        try {
            if(!password || !passwordConfirm){
                throw new BasicError("Você precisa da senha e da confirmação de senha para realizar essa função", 400);
            }

            const user = await this.userServices.getOneById(Number(userId));
            if(user === null){
                throw new NotFoundError();
            }

            if(password !== passwordConfirm){
                throw new BasicError("A senhas não coincedem, tente novamente", 403);
            }
            const pwdMatch = await bcrypt.compare(password, user.password);
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