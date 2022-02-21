const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('bdconfig')
		.setDescription('Set bot parameters for your server!'),

	async execute(interaction) {

		const exampleEmbed = new MessageEmbed()
		.setColor('#0099ff')
		.setTitle('Server Setup - Birthday Channel')
		.setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL()})
		.setThumbnail(interaction.guild.iconURL())
		.setDescription(
		`To begin you must set up the birthday channel. 
		Please react with an option:
		 `)
		.addField( 
			`Create a new channel 🔨 \nSelect Pre-Existing Channel 🖱`, "\u200b", false
		)
		.setTimestamp();
	
		const message = await interaction.channel.send({ embeds: [exampleEmbed] }); 


		message.react('🔨').then(() => message.react('🖱')).then(() => message.react('❌'));

		const filter = (reaction, user) => {
			return ['🔨', '🖱', '❌'].includes(reaction.emoji.name) && user.id === interaction.user.id;
		};

		const collector = message.createReactionCollector({filter, time: 60000, errors: ['time'] })
		
		collector.on('collect', mess => {
			message.channel.send('EL PEPE');
		})

		collector.on('end', mess => {
			message.channel.send('Time has ran out, please insert command again.')
		})
    }   
}