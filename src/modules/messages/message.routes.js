const { Router} = require('express');
const {createConversationMessage, getConversationMessages} = require('../messages/messages.controllers');
const authenticate = require('../../middelwares/auth.middleware');
const router = Router();

router.route('/conversation/:id', )
    .post(authenticate, createConversationMessage)
    .get(authenticate, getConversationMessages)

module.exports = router;