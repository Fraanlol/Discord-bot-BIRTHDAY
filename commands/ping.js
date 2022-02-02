const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
		await interaction.reply('Pong!');
		//INTERESTING, fetchs the mesage "Pong", usefull for adding reactions and stuff.
		// const message = await interaction.fetchReply();
		// console.log(message);
	},
};