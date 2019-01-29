"use strict";
module.exports = (sequelize, DataTypes) => {
  const Rider = sequelize.define(
    "Rider",
    {
      uuid: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV1
      },
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      age: DataTypes.INTEGER,
      profession: DataTypes.STRING
    },
    {}
  );
  Rider.associate = function(models) {
    Rider.hasMany(models.Bike);
  };
  return Rider;
};
