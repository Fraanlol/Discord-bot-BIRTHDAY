const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
require('dotenv').config();

const commands = [];

const rest = new REST({ version: '9' }).setToken(process.env.bot_token);

rest.put(Routes.applicationGuildCommands(process.env.clientId, process.env.guildId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);