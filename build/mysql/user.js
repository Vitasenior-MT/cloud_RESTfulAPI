'use strict';
module.exports = (sequelize, DataTypes) => {
    var User = sequelize.define('User', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique:{
                args: true,
                msg: 'email already registered'
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        admin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }, {
            scopes: {
                profile: { attributes: { exclude: ['password'] } }
            },
            underscored: true
        });

    User.associate = function (models) {
        models.User.belongsToMany(models.Vitabox, { through: models.UserVitabox });
    };

    return User;
};