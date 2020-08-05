const Discord = require('discord.js');
var maintenance = false;
module.exports = {
    name: 'join',
    description: 'Joins the current voice channel',
    aliases: ['j'],
    execute(message, args) {
        if (message.member.voice.channel) {
            message.member.voice.channel.join();
        } else {
            message.reply("You need to join a channel first")
        }
    }
};
