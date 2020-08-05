const Discord = require('discord.js');
var maintenance = false;
colours = require('../../colours.json');
const parent = require('../../bot.js');
module.exports = {
	name: 'server',
	description: 'Displays server information',
	execute(message, args) {
    const sembed = new Discord.MessageEmbed()
        .setTitle('Server Information')
        .setThumbnail(message.guild.iconURL())
        .setDescription(`Information on ${message.guild.name}`)
        .setColor(colours.gold)
        .setAuthor(`${message.guild.name} Info`, message.guild.iconURL())
        .addField(`**Guild Name**`, `${message.guild.name}`, true)
        .addField(`**Guild Owner**`, `${message.guild.owner}`, true)
        .addField(`**Member Count**`, `${message.guild.memberCount}`, true)
        .addField(`**Highest Role**`, `${message.guild.roles.highest}`, true)
        .addField(`**Region**`, `${message.guild.region}`, true)
        .addField(`**Server Creation**`, `${message.guild.createdAt}`, true)
        .setFooter(`Proximity | Footer`, parent.client.user.displayAvatarURL());
        message.channel.send(sembed);
	}   
};
