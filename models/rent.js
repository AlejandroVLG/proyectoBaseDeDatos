'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Rent.belongsTo(models.Client, {
        //userId es la clave importada en este caso
        foreignKey: 'clientId'
      });
      Rent.belongsTo(models.Film, {
        //userId es la clave importada en este caso
        foreignKey: 'filmId'
      });
    }
  }
  Rent.init({
    return_date: DataTypes.STRING,
    max_rent_date: DataTypes.STRING,
    total_price: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Rent',
  });
  return Rent;
};