const pepe = require('../BirthdayTable.js');

module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);
		pepe.Tags.sync().then(() => console.log('Escritura Realizada')).catch(() => console.error("ERROR al escribir la base de datos"));
	},
};