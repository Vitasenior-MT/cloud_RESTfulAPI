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
            allowNull: false,
            defaultValue: '',
            validate: {
                notEmpty: {
                    msg: "transducer name must be defined"
                }
            }
        },
        measure: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: '',
            validate: {
                notEmpty: {
                    msg: "transducer measure must be defined"
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
        }
    }, { underscored: true });

    Sensor.associate = function (models) {
        models.Sensor.belongsToMany(models.Boardmodel, { through: "BoardSensor" });
    };

    return Sensor;
};