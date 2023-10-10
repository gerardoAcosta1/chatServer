const {Conversation, User, Participant, Message} = require('../../models')

const createConversation = async (req, res, next) => {

    try {

        const {userId, participantId} = req.body

        const conversation = await Conversation.create({createdBy: userId});
        const {id} = conversation;

        const user = await User.findByPk(userId);
        const participant = await User.findByPk(participantId);

        await conversation.addUser(user);
        await conversation.addUser(participant)

        res.status(201).json(id);

    } catch (error) {

        next(error);

    }
}

const createGroupConversation = async (req, res, next) => {
    try {
        // ? cuántos participantes se van a enviar al crear una conversación grupal
        const {userId, participantsId, title} = req.body;
        const conversation = await Conversation.create({createdBy: userId, title, type: 'group'});
        //es necesario crear a los participantes en la tabla pivote
        const createParticipants = [...participantsId, userId].map(participant => ({
            ConversationId: conversation.id, 
            UserId: participant,
        }))
        //con el método bulkCreate, creamos múltiples participants
        await Participant.bulkCreate(createParticipants);

        res.status(201).end();
    } catch (error) {

        next(error);
    }
}

const getAllConversations = async (req, res, next) => {

    try {
        const {id} = req.params;

        const conversations = await Participant.findAll({
            where: { UserId: id },
            include: {
            model:Conversation,
                include:{
                model:Participant,
                    attributes:['UserId'],
                    include:{
                        model:User,
                            attributes: ['firstname', 'lastname', 'avatar'],
                    },
                },
            },
        });

        res.json(conversations);
    } catch (error) {
        next(error)
    }
};

const deleteConversation = async (req, res, next) => {
    const conversationId = req.params.id;

    try {
      // Eliminar las referencias en la tabla 'participants'
      await Participant.destroy({
        where: { ConversationId: conversationId }
      });
      
      // Luego, elimina la conversación
      await Conversation.destroy({
        where: { id: conversationId }
      });

      
  
      return res.status(200).json({ message: 'Conversación y participantes eliminados con éxito' });
    } catch (error) {
    next(error)
    }
}

module.exports = {
    createConversation,
    createGroupConversation,
    getAllConversations,
    deleteConversation
}