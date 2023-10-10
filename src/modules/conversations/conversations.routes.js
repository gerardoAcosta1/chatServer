const {Router} = require('express');
const { createConversation, createGroupConversation, getAllConversations, deleteConversation } = require('./conversations.controllers');
const authenticate = require('../../middelwares/auth.middleware');

const router = Router();

//crear conversaciones
//crear conversaciones grupales 
//obtener todas las conversaciones
//obtener una conversacion con todos los mensajes

router.post('/',authenticate, createConversation)

router.get('/:id',authenticate, getAllConversations);

router.delete('/:id',authenticate, deleteConversation);

router.post('/group',authenticate, createGroupConversation);

module.exports = router;