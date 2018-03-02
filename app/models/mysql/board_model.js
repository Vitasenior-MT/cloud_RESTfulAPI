'use strict';
module.exports = (sequelize, DataTypes) => {
    var Boardmodel = sequelize.define('Boardmodel', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        type: {
            type: DataTypes.ENUM,
            values: ["environmental", "wearable", "non-wearable"],
            validate: {
                isIn: {
                    args: [["environmental", "wearable", "non-wearable"]],
                    msg: "board type must be environmental, wearable or non-wearable"
                }
            }
        },
        name: {
            type: DataTypes.STRING,
            unique: {
                args: true,
                msg: 'board model already registered'
            },
            allowNull: false,
            defaultValue: '',
            validate: {
                notEmpty: {
                    msg: "board model must be defined"
                }
            }
        }
    }, { underscored: true });

    Boardmodel.associate = function (models) {
        models.Boardmodel.hasMany(models.Board);
        models.Boardmodel.belongsToMany(models.Sensor, { through: "BoardSensor" });
    };

    return Boardmodel;
};