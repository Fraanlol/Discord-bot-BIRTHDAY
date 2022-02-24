const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('bdconfig')
		.setDescription('Set bot parameters for your server!'),

	async execute(interaction) {

		const table = interaction.client.databases.get('guilds');
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

		message.react('🔨').then(() => message.react('🖱'));

		const filter = (reaction, user) => {
			return ['🔨', '🖱'].includes(reaction.emoji.name) && user.id === interaction.user.id;
		};

		const collector = message.createReactionCollector({filter, time: 60000, errors: ['time'] })
		
		collector.on('collect', async mess => {
			const guildExists = await table.findOne({ where: { guildId: interaction.guild.id} });


			if(mess._emoji.name == '🔨'){

				let newChannel = await interaction.guild.channels.create('🎂🎂 Birthday 🎂🎂', {
					type: 'GUILD_TEXT',
					permissionOverwrites: [{
						id: message.guild.id,
						allow: ['VIEW_CHANNEL'],
						deny: ['SEND_MESSAGES'],
					}]
				});

				if(!guildExists){
					table.create({
						guildId: interaction.guild.id,
						guildChannel: newChannel.id,
					}).then(() => {
						interaction.channel.send("Channel successfully registered");
					}).catch((err) => {
						console.error(err);
						interaction.channel.send("Something went wrong");
					});
				}else{
					table.update(
						{guildChannel: newChannel.id},
						{where: { guildId: interaction.guild.id}},
					).then(() => {
						interaction.channel.send("Channel successfully registered");
					}).catch((error) => {
						console.log(error);
						interaction.channel.send("Something went wrong");
					})
				}

			}else if(mess._emoji.name == '🖱'){
				if(!guildExists){
					table.create({
						guildId: interaction.guild.id,
						guildChannel: interaction.channel.id,
					}).then(() => {
						interaction.channel.send("Channel successfully registered");
					}).catch((err) => {
						console.error(err);
						interaction.channel.send("Something went wrong");
					});
				}else{
					table.update(
						{guildChannel: interaction.channel.id},
						{where: { guildId: interaction.guild.id}},
					).then(() => {
						interaction.channel.send("Channel successfully registered");
					}).catch((error) => {
						console.log(error);
						interaction.channel.send("Something went wrong");
					})
				}
			}
		})
		
		collector.on('end', mess => {
			message.channel.send('Time has ran out, please insert command again.')
		})
    }
}