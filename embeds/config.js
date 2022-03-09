const { MessageEmbed } = require('discord.js');


module.exports = {
    configEmbed : new MessageEmbed()
    .setColor('#0099ff')
    .setTitle('Server Setup - Birthday Channel')
    .setDescription(`To begin you must set up the birthday channel.\nPlease react with an option:`)
    .addField(`Create a new channel 🔨 \nSelect Pre-Existing Channel 🖱`, "\u200b", false)
    .setTimestamp(),
} 