require('dotenv').config();

const Discord = require('discord.js');
const client = new Discord.Client({ 
	intents: [
		Discord.Intents.FLAGS.GUILDS,
		Discord.Intents.FLAGS.GUILD_MESSAGES,
		Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS
		] 
	});
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

const Users = sequelize.define('Users', {
	userId: Sequelize.STRING,
	date: Sequelize.STRING,
	username: Sequelize.STRING,
	guildId: Sequelize.STRING,
});

const Guilds = sequelize.define('Guilds', {
	guildId:{
		type: Sequelize.STRING,
		unique: true,
	},
	guildChannel: Sequelize.STRING,
})

client.databases.set('users', Users);
client.databases.set('guilds', Guilds)


//CRON TIMER

cron.schedule('0 * * * * *', () => {

	//FIRST FIND BIRTHDAY USERS.
	Users.findAll(
		{
			attributes: ['userId','guildId'],
			where:{
				date:dateForm.format(new Date(), 'MM/dd') 
			}
		}
		//ONCE FOUND, LOOK FOR GUILD CHANNEL TO SEND MESSAGE.
	).then( birthBoy => birthBoy.forEach(async (key) => {
				Guilds.findOne({
					attributes: ['guildChannel'],
					where:{
						guildId : key.dataValues.guildId,
					}
				}).then(response => {
					client.channels.fetch(response.dataValues.guildChannel).then(async channelRes =>{
						await channelRes.send(`@everyone today is <@${key.dataValues.userId}> birthday!!!!`).react('🎂');
						await channelRes.send('Greet him with a warm message!');
					})
				})
	}))
});

client.login(process.env.bot_token);




