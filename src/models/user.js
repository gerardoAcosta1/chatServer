'use strict';
const {Model} = require('sequelize');
const bcrypt = require('bcrypt');
const sendWelcomeEmail = require('../utils/sendMail');


module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Message, {foreignKey:'senderId'});
      User.hasMany(models.Conversation, {foreignKey: 'createdBy'});
      User.belongsToMany(models.Conversation, {through:'Participant', onDelete: 'CASCADE'});
      User.hasMany(models.Participant, {foreignKey: 'UserId'});
    }
  }
  
  User.init({
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: DataTypes.STRING,
    avatar: DataTypes.STRING,
    password: DataTypes.STRING,
    description: DataTypes.STRING,
    validEmail: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: async (user, options) => {

        const hashed = await bcrypt.hash(user.password, 10);
        user.password = hashed;
      },
      afterCreate:  async (user, options) => {

        const {email, firstname, lastname} = user;
       await sendWelcomeEmail(email,{firstname, lastname});

      }
    }, 
    
  });
  return User;
};