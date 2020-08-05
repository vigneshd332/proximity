const Discord = require('discord.js');
var maintenance = false;
const parent = require('../../bot.js')
module.exports = {
    name: 'ban',
    description: 'Bans a user',
    aliases: ['ban'],
    async execute(message, args) {
        if (message.member.hasPermission('BAN_MEMBERS')) {
            const member = message.mentions.members.first();
            if (member.id == parent.client.config.botID) {
                message.reply("I cannot ban myself")
            } else {

                message.guild.members.ban(member);

            }
        } else {
            message.reply('You do not have permission to ban')
        }
    }
};
