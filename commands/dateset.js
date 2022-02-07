const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('dateset')
		.setDescription('Set your birthday date!')
		.addStringOption(option => option.setName('date')
									.setDescription('Birthday!')
									.setRequired(true)
		),
	async execute(interaction) {
		const regExpr = /(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/g;
		const retrieveDate = interaction.options.getString('date');


		if(retrieveDate.match(regExpr)){
			console.log('funciona!');
			interaction.reply('Gracias por su fecha!');
		}else{
			interaction.reply('El formato correcto es: /dateset mm/dd');
		}

	},
}; 