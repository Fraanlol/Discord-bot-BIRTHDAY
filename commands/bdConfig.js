const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('bdconfig')
		.setDescription('Set bot parameters for your server!')
		.addStringOption(option => option.setName('date')
									.setDescription('Birthday!')
									.setRequired(true)
		),
	async execute(interaction) {
        // const channel = interaction.channel;
        // console.log(channel);
    }   
}