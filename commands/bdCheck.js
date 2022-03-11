const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('bdcheck')
		.setDescription('View any user\'s birthday')
		.addStringOption(option => option.setName('username')
									.setDescription('Username')
									.setRequired(true)
		),
	async execute(interaction) {
        const table = interaction.client.databases.get('users');
        const userName = interaction.options.getString('username');
        
        try{
            table.findOne({ where: { username: userName, guildId : interaction.guild.id} }).then(response => {
                if(response == null){
                    return interaction.reply(`User not found`);
                }else{
                    return interaction.reply(`Username: ${response.username}, Birthday: ${response.date}`)

                }
            })
        }catch(error){
            console.log(error);
        }
    }
}