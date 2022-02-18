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
        const table = interaction.client.databases.get('tags');
        const userDate = interaction.options.getString('date');
        const userId = interaction.user.id;
        const userName =  interaction.user.username;
		const regExpr = /(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/g;

        if(userDate.match(regExpr)){
            try {
                await table.create({
                    userId: userId,
                    date: userDate,
                    username: userName,
                });
            
                return interaction.reply(`${userName} date added successfully`);
            }
            catch (error) {
                if (error.name === 'SequelizeUniqueConstraintError') {
                    return interaction.reply('This user already exists. View it with /bdcheck or modify with /bdchange');
                }else{
                    console.log(error);
                }
            }
        }else{
            return interaction.reply("Correct format is MM/dd");
        }
    }   
}