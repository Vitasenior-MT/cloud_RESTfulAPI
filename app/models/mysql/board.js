'use strict';
module.exports = (sequelize, DataTypes) => {
    var Board = sequelize.define('Board', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        location: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        },
        mac_addr: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                args: true,
                msg: 'MAC address already in use'
            },
            validate: {
                is: {
                    args: /^([0-9a-f]{2}[:]){7}([0-9a-f]{2})$/,
                    msg: "MAC addres must be valid"
                }
            }
        },
        active: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }, { underscored: true });

    Board.associate = function (models) {
        models.Board.belongsTo(models.Vitabox);
        models.Board.belongsTo(models.Boardmodel);
    };

    return Board;
};