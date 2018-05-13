'use strict';
module.exports = (sequelize, DataTypes) => {
  var Sensor = sequelize.define('Sensor', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    last_values: { type: DataTypes.JSON },
    last_commit: { type: DataTypes.DATE }
  }, { underscored: true });

  Sensor.associate = function (models) {
    models.Sensor.belongsTo(models.Board);
    models.Sensor.belongsTo(models.Sensormodel);
  };

  return Sensor;
};