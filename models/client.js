'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Client extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Client.hasMany(models.Rent, {
        //En este caso, foreignKey hace referencia a como se llama la clave de user en la tabla Sale
        foreignKey: 'clientId'
      });
    }
  }
  Client.init({
    name: DataTypes.STRING,
    dni: DataTypes.STRING,
    password: DataTypes.STRING,
    age: DataTypes.INTEGER,
    email: DataTypes.STRING,
    rol: DataTypes.STRING,
    client_number: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Client',
  });
  return Client;
};