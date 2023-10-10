const userRoutes = require('../modules/user/user.routes');
const conversationRoutes = require('../modules/conversations/conversations.routes');
const messageRoutes = require('../modules/messages/message.routes')

const apiV1Routes = (app) => {

    app.use('/api/v1/users', userRoutes);
    app.use('/api/v1/conversations', conversationRoutes);
    app.use('/api/v1/messages', messageRoutes);

}

module.exports = apiV1Routes;
