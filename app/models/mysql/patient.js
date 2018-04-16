'use strict';
module.exports = (sequelize, DataTypes) => {
    var Patient = sequelize.define('Patient', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        birthdate: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: '',
            validate: {
                notEmpty: {
                    msg: "patient name must be defined"
                }
            }
        },
        gender: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: '',
            validate: {
                notEmpty: {
                    msg: "patient gender must be defined"
                }
            }
        },
        active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    }, { underscored: true });

    Patient.associate = function (models) {
        models.Patient.belongsTo(models.Vitabox);
    };

    return Patient;
};