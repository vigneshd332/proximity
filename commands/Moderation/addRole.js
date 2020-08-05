const Discord = require('discord.js');
var maintenance = false;
const parent = require('../../bot.js')
module.exports = {
    name: 'add role',
    description: 'Adds a role to user',
    aliases: ['addrole'],
    async execute(message, args) {
        if (message.member.hasPermission('MANAGE_ROLES')) {
            var mentionedRole = message.mentions.roles.first();
            var roleMember = message.mentions.members.first();
            if (!mentionedRole) return message.reply(`I am unable to find role: ${mentionedRole}`);

           roleMember.roles.add(mentionedRole).then(message.channel.send("Role successfully added.")).catch(console.error);
        } else {
            message.reply('You do not have permission to do this')
        }
    }
};
