'use strict';
module.exports = (sequelize, DataTypes) => {
  const Bike = sequelize.define('Bike', {
    name: DataTypes.STRING,
    brand: DataTypes.STRING,
    yom: DataTypes.INTEGER
  }, {});
  Bike.associate = function(models) {
    Bike.belongsTo(models.Rider);
  };
  return Bike;
};