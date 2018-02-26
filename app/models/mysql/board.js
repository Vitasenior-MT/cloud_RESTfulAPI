'use strict';
module.exports = (sequelize, DataTypes) => {
    var Board = sequelize.define('Board', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        location: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        }
    }, { underscored: true });

    Board.associate = function (models) {
        models.Board.belongsTo(models.Vitabox);
        models.Board.belongsTo(models.Boardmodel);
    };

    return Board;
};