const Incident = require('./../models/Incident');
const User = require('./../models/User');
const Mailer = require('./../services/mailer'); 

module.exports = {
    async index(request, response){
        const incidents = await Incident.find();

        return response.status(200).json(incidents);
    },

    async show(request, response){
        const { id } = request.params;
 
        const incident = await Incident.findById(id);
        const { email, phone } = await User.findById(incident.user);
    
        return response.status(200).json({
            incident,
            phone,
            email
        });
    }, 

    async store(request, response){
        const { filename } = request.file;
        const { title, description, value } = request.body;
        const { user_id } = request.headers;
   
        
        const { email, name } = await User.findById(user_id);
       
        if(email === null || email.length === 0){
            response.status(403).send({
                message: "Você não tem autorização para criar um incident"
            })
        }

        try {
            const { id } = await Incident.create({
                user: user_id,
                image: filename,
                title,
                description,
                value,
                // location,
                favorite: false
            });
    
            Mailer.senderCreateIncident(email,name);
            response.status(201).json({ id });

        } catch(err){

            response.status(400).send({
                message: "Não foi possível cadastrar caso!",
                err
            })
        }
        
        
    }, 
    async update(request, response){
        const  user_id  = request.headers.authorization;
        
        if(!user_id){
            response.status(403).send({
                message: "Você não está autorizado a editar o incident"
            })
        } else {
            try {
                await Incident.findByIdAndUpdate(request.params.id, request.body);
                response.status(200).send({
                  message: 'Incident atualizado com sucesso!'
                });
              } catch (e) {
                response.status(400).send({message: 'Falha ao atualizar o incident.'});
            }
        }

    },
    async delete(request, response){
        const  user_id  = request.headers.authorization;
        const { id } = request.params;
        //verifica se o usuário que está deletando é o mesmo que está logado, se não for ele retorna um não autorizado
        if(!user_id){
            response.status(403).send({
                message: 'Você não está autorizado a deletar o incident!'
            })
        } else {
            try {
                await Incident.findByIdAndDelete(id);
                response.status(200).send({
                    message: 'Caso excluído com sucesso!'
                });
            } catch (e) {
                response.status(400).send({
                    message: 'Não foi possível excluir seu caso, tente novamente'
                });
            }
        }    
    }
}