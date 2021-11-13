const { Sequelize } = require('sequelize');
const { join } = require('path');

const DB_NAME = process.env.DB_NAME || 'database.sqlite3';

const sequelize = new Sequelize(`sqlite:${DB_NAME}`);

module.exports = sequelize;