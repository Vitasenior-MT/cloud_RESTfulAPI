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
            values: ['environmental', 'wearable', 'non-wearable'],
            allowNull: {
                args: false,
                msg: "board type must be defined"
            },
            validate: {
                isIn: {
                    args: ['environmental', 'wearable', 'non-wearable'],
                    msg: "board type must be 'environmental', 'wearable' or 'non-wearable'"
                }
            }
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                args: true,
                msg: 'board model already registered'
            }
        }
    }, { underscored: true });

    Boardmodel.associate = function (models) {
        models.Boardmodel.hasMany(models.Board);
        models.Boardmodel.belongsToMany(models.Sensor, { through: "BoardSensor" });
    };

    return Boardmodel;
};