//Importações e instancia das rotas
const { Router } = require('express');
const routes = Router();
//
// Importações referente as validações
const { Segments, celebrate, Joi } = require('celebrate');
//importações referente aos uploads de arquivos
const multer = require('multer');
const uploadConfig = require('./config/upload')
//
//Controllers
const UserController = require('./controllers/UserController');
const SessionController = require('./controllers/SessionController');
const IncidentController = require('./controllers/IncidentController');
//

const upload = multer(uploadConfig);

//Rota de Login
routes.post('/sessions', SessionController.login);

routes.get('/', (request, response) => {
    return response.send('Só na guitarrada complicada');
});

//Rotas referente ao usuário
routes.get('/users', UserController.index);
routes.get('/users/incidents/', UserController.show); //Lista os incidents cadastrados pelo usuário.
routes.put('/users/:id', UserController.update);
routes.delete('/users/:id', UserController.delete);
routes.post('/users', celebrate({
    //Validações
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        password: Joi.string().required().min(5),
        email: Joi.string().required().email(),
        phone: Joi.string().required().min(8).max(9),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2)
    }),
}), UserController.store);

//Rotas referentes aos incidents
routes.get('/incidents', IncidentController.index);
routes.get('/incidents/:id', IncidentController.show);
routes.post('/incidents', upload.single('image'), IncidentController.store);
routes.put('/incidents/:id', IncidentController.update);
routes.delete('/incidents/:id', IncidentController.delete);






module.exports = routes;