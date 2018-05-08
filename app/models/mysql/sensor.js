'use strict';
module.exports = (sequelize, DataTypes) => {
  var Sensor = sequelize.define('Sensor', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    transducer: {
      type: DataTypes.STRING
    },
    measure: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
      validate: {
        notEmpty: {
          msg: "measure init must be defined"
        }
      }
    },
    tag: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
      validate: {
        notEmpty: {
          msg: "measure tag must be defined"
        }
      }
    },
    min_acceptable: {
      type: DataTypes.DECIMAL(10, 5),
      allowNull: false,
      validate: {
        isDecimal: {
          args: true,
          msg: "minimum acceptable value must be defined"
        }
      }
    },
    max_acceptable: {
      type: DataTypes.DECIMAL(10, 5),
      allowNull: false,
      validate: {
        isDecimal: {
          args: true,
          msg: "maximum acceptable value must be defined"
        }
      }
    },
    min_possible: {
      type: DataTypes.DECIMAL(10, 5),
      allowNull: false,
      validate: {
        isDecimal: {
          args: true,
          msg: "minimum possible value must be defined"
        }
      }
    },
    max_possible: {
      type: DataTypes.DECIMAL(10, 5),
      validate: {
        isDecimal: {
          args: true,
          msg: "maximum possible value must be defined"
        }
      }
    },
    last_values: {
      type: DataTypes.JSON,
      defaultValue: [],
    },
    last_commit: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null
    },
    deviation_range: {
      type: DataTypes.DECIMAL(10, 5),
      defaultValue: 0,
    },
  }, { underscored: true });

  Sensor.associate = function (models) {
    models.Sensor.belongsToMany(models.Boardmodel, { through: "BoardSensor" });
  };

  return Sensor;
};