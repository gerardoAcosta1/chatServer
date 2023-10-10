const {Message} = require('../../models');

const createConversationMessage = async (req, res, next) => {

    try {
        
        const { id: conversationId } = req.params;

        const {senderId, content} = req.body;
        if(!conversationId){
            return res.json('conversation id is undefined')
        }
        await Message.create({
            conversationId,
            senderId,
            content
        })
        
        res.status(201).json(conversationId)
    } catch (error) {
        next(error)
    }
}

const getConversationMessages = async (req, res, next) => {

    try {
        const {id: conversationId} = req.params;

        const messages = await Message.findAll({
            where: {conversationId}
        })

        res.json(messages);

    } catch (error) {
        console.log(req.body)
        
    }
}

module.exports = {
    createConversationMessage,
    getConversationMessages
}