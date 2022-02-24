
module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);

		client.databases.each(key => {
			key.sync()
			.then(() => {
				console.log(`Escritura realizada con exito en ${key.name}`);
			})
			.catch(() => {
				console.error(`Error al escribir en ${key.name}`);
			})
		})
	},
};