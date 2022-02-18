const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!')
		.addIntegerOption(date => 
			date.setName('cumple')
			.setDescription('Jojo')
			.setRequired(true)
		),
	async execute(interaction) {
		await interaction.reply('Pong!');
		const integer = interaction.options.getInteger('cumple');
		console.log(integer);
		//INTERESTING, fetchs the mesage "Pong", usefull for adding reactions and stuff.
		// const message = await interaction.fetchReply();
        // console.log(message);
	},
};