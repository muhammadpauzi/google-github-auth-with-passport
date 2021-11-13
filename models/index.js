const User = require('./User');

User.sync().then(() => 'User table created!');
// User.sync({ force: true }).then(() => 'User table created!');

module.exports = { User };