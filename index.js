require('dotenv').config();

const Discord = require('discord.js');
const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS] });
const fs = require('fs');
const cron = require('node-cron');
const dateForm = require('date-fns');

// Command Handler

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}

//Event Handler

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

// Database handler

const Sequelize = require('sequelize');

client.databases = new Discord.Collection();

const sequelize = new Sequelize('database', 'user', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	// SQLite only
	storage: 'database.sqlite',
});

const tags = sequelize.define('birthDays', {
	userId: {
		type: Sequelize.STRING,
		unique: true,
	},
	date: Sequelize.STRING,
	username: Sequelize.STRING,
});

client.databases.set('sequelize', sequelize);
client.databases.set('tags', tags);

//CRON TIMER

// cron.schedule('5 * * * * *', () => {

// 	tags.findAll(
// 		{
// 			attributes: ['userId'],
// 			where:{
// 				date:dateForm.format(new Date(2020,08,06), 'MM/dd')
// 			}
// 		}
// 	).then( (birthBoy) => birthBoy.forEach((key) => {
// 		client.users.fetch(key.userId).then((retrievedUser) => {
// 			console.log(retrievedUser);
// 		})
// 	}))
// });

client.login(process.env.bot_token);

