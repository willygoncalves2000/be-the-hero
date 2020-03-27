const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate'); 

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

routes.post('/sessions', SessionController.create);


// lista as ongs
routes.get('/ongs', OngController.index);

//insere uma ong
routes.post('/ongs', celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(), /* valida o nome como string e obrigatório  */
    email: Joi.string().required().email(), /*valida email como string, obrigatório e formato de email */
    whatsapp: Joi.string().required().min(10).max(13), /*whatsapp é uma string, obrigatório, com no minimo 10 caracteres e no maximo 11 */
    city: Joi.string().required(),
    uf: Joi.string().required().length(2),
  })
}), OngController.create);

// lista os incidents da ONG logada
routes.get('/profile', celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required(),
  }).unknown(), /*A requisição HTTP envia vários HEADERS, então os que nao sao validados aqui, serão ignorados  */
}),ProfileController.index);

// lista os incidents
routes.get('/incidents', celebrate({
  [Segments.QUERY]: Joi.object().keys({
    page: Joi.number(),
  })
}),IncidentController.index);

//insere um incidents 
routes.post('/incidents', celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required(),
  }).unknown(),
  [Segments.BODY]: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    value: Joi.number().required(),
  })
}), IncidentController.create);

//deleta um incident
routes.delete('/incidents/:id', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required(),
  })
}), IncidentController.delete)

module.exports = routes;