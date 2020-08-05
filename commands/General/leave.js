const Discord = require('discord.js');
var maintenance = false;
module.exports = {
    name: 'leave',
    description: 'Leaves the current voice channel',
    execute(message, args) {
        if (message.member.voice.channel) {
            

            const serverQueue = message.client.queue.get(message.guild.id);

            if (!serverQueue || typeof serverQueue === 'undefined') {
                console.log("No queue detected ")
                message.member.voice.channel.leave();

            } else {

                serverQueue.songs = [];
                serverQueue.connection.dispatcher.end()

            }
        } else {
            message.reply("You cannot kick me if you are not in the vc")
        }
    }
};
