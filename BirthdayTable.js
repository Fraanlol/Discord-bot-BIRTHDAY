const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'user', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	// SQLite only
	storage: 'database.sqlite',
});

const Tags = sequelize.define('birthDays', {
	userId: {
		type: Sequelize.STRING,
		unique: true,
	},
	date: Sequelize.INTEGER,
});

module.exports = {Tags};