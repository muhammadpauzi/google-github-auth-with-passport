const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
    authId: {
        type: DataTypes.STRING,
        allowNull: false
    },
    displayName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, { timestamps: true });

module.exports = User;