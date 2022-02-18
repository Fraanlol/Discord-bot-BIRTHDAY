const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('bdchange')
		.setDescription('Change your birthday!')
		.addStringOption(option => option.setName('date')
									.setDescription('Change your already set birthday!')
									.setRequired(true)
		),
	async execute(interaction) {
        const table = interaction.client.databases.get('tags');
        const userDate = interaction.options.getString('date');
        const tag = await table.findOne({ where: { userId: interaction.user.id} });
		const regExpr = /(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/g;

        if(userDate.match(regExpr)){
            if (tag) {
                await table.update({ date: userDate }, { where: { userId: interaction.user.id} });
                interaction.reply(`${interaction.user.username} your date was edited!!`);
            }else{
                 interaction.reply(`Could not find tag: ${tagName}`);
            }
        }else{
            interaction.reply('El formato correcto es: /dateset mm/dd');
        } 
    }   
}