'use strict';
module.exports = (sequelize, DataTypes) => {
  const Rider = sequelize.define('Rider', {
    name: DataTypes.STRING,
    email:  DataTypes.STRING, 
    age: DataTypes.INETGER,
    profession:  DataTypes.STRING
  }, {});
  Rider.associate = function(models) {
    Rider.hasMany(models.Bike);
  };
  return Rider;
};