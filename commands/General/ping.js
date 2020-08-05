const Discord = require('discord.js');
var maintenance = false;
module.exports = {
    name: 'ping',
    description: 'Gets User Ping',
    aliases: ['pi'],
    execute(message, args) {
        message.channel.send("Pinging...") //Placeholder for ping
            .then((msg) => {
                msg.edit("Ping: " + (Date.now() - msg.createdTimestamp)+" ms")
            });
    }
};
