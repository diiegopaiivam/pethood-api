const User = require('./../models/User');
const Incident = require('./../models/Incident');
const crypto = require('crypto');
const Mailer = require('./../services/mailer'); 

module.exports = {

    async index(request, response){
        const users = await User.find();

        response.json(users);
    },

    async show(request, response){
        const  user_id  = request.headers.authorization;

        const incidents = await Incident.find().where('user', user_id);

        return response.status(200).json({incidents});
    },

    async store(request, response){

        const { name, password, email, phone, city, uf } = request.body;
        /**
         * Criptografando a senha do usuário, transformando um pequeno hash hexadecimal com a a função do crypto do nodejs
         */
        const alg = 'aes-256-ctr';
        const pwd = 'abcdabcd';
        const cipher = await crypto.createCipher(alg, pwd);
        const crypted = cipher.update(password, 'utf8', 'hex');


        //verifica se o usuario já está cadastrado pelo email
        let user = await User.findOne({ email });
        if (!user){
            const user = await User.create({
                name,
                password: crypted,
                email, 
                phone,
                city,
                uf
            });
            Mailer.sender(email,name);
            response.json(user);

        } else {
            return response.status(403).send({message: 'Email já está na nossa base do sistema'});
        }
        
    },

    async update (request, response){
        try {
          await User.findByIdAndUpdate(request.params.id, request.body);
          response.status(200).send({
            message: 'Usuário atualizado com sucesso!'
          });
        } catch (e) {
          response.status(400).send({message: 'Falha ao atualizar o usuário.'});
        }
    }, 

    async delete(request, response){

        try {
            await User.findByIdAndDelete(request.params.id);
            response.status(200).send({
                message: 'Conta excluída com sucesso!'
            });
        } catch (e) {
            response.status(400).send({
                message: 'Não foi possível excluir sua conta'
            });
        }    
    }
}

