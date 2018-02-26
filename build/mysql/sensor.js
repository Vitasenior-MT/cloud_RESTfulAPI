'use strict';
module.exports = (sequelize, DataTypes) => {
    var Sensor = sequelize.define('Sensor', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        transducer: {
            type: DataTypes.STRING,
            allowNull:{
                args: false,
                msg: "transducer name must be defined"
            }
        },
        measure:{
            type: DataTypes.STRING,
            allowNull: {
                args: false,
                msg: "transducer measure must be defined"
            }
        },
        min_acceptable: {
            type: DataTypes.DECIMAL(10, 5),
            allowNull: {
                args: false,
                msg: "minimum acceptable value must be defined"
            }
        },
        max_acceptable: {
            type: DataTypes.DECIMAL(10, 5),
            allowNull: {
                args: false,
                msg: "maximum acceptable value must be defined"
            }
        },
        min_possible: {
            type: DataTypes.DECIMAL(10, 5),
            allowNull: {
                args: false,
                msg: "minimum possible value must be defined"
            }
        },
        max_possible: {
            type: DataTypes.DECIMAL(10, 5),
            allowNull: {
                args: false,
                msg: "maximum possible value must be defined"
            }
        }
    }, { underscored: true });

    Sensor.associate = function (models) {
        models.Sensor.belongsToMany(models.Boardmodel, { through: "BoardSensor" });
    };

    return Sensor;
};