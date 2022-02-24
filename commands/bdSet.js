const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('bdset')
		.setDescription('Set your birthday!')
		.addStringOption(option => option.setName('date')
									.setDescription('Set your birthday!')
									.setRequired(true)
		),
	async execute(interaction) {
        const table = interaction.client.databases.get('users');
		const regExpr = /(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/g;
        const userDate = interaction.options.getString('date');
        const userExists = await table.findOne({ where: { username: interaction.user.username, guildId: interaction.guild.id} })

        if(userDate.match(regExpr)){
            if(!userExists){
                try {
                    await table.create({
                        userId: interaction.user.id,
                        date: userDate,
                        guildId: interaction.guild.id,
                        username:interaction.user.username,
                    });
                
                    return interaction.reply(`${interaction.user.username} date added successfully`);
                }
                catch (error) {
                    console.error(error);
                }
            }else{
                return interaction.reply("User already exists in this guild");
            }
        }else{
            return interaction.reply("Correct format is MM/dd");
        }
    }   
}