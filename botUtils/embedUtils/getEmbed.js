const fs = require('fs');

module.exports = {
    getEmbed : (embedName, guildReceive) => {
        let embedFile = fs.readdirSync('embeds').filter(key => key.includes(embedName));
        const embed = require(`../../embeds/${embedFile[0]}`);
        const resultEmbed = embed.configEmbed.setAuthor({ name: guildReceive.name, iconURL: guildReceive.iconURL()})
        .setThumbnail(guildReceive.iconURL());

        return resultEmbed;
    }
}