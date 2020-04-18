const Incident = require('./../models/Incident');
const User = require('./../models/User');
const Mailer = require('./../services/mailer'); 
module.exports = {
    async index(request, response){
        const incidents = await Incident.find();

        return response.status(200).json(incidents);
    },
    async store(request, response){
        const { filename } = request.file;
        const { title, description, value } = request.body;
        const { user_id } = request.headers;

        const { email, name } = await User.findById(user_id);

        try {
            const incident = await Incident.create({
                user: user_id,
                image: filename,
                title,
                description,
                value
            });
    
            Mailer.senderCreateIncident(email,name);
            response.status(201).json(incident);
        } catch(error){
            response.status(400).json(error);
        }


    }
}