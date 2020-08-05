const Discord = require('discord.js');
var maintenance = false;
module.exports = {
	name: 'prune',
    description: 'Deletes N most recent messages',
    cooldown: 5,
    aliases: ['pr', 'del'],
    usage: "[Number of Messages]",
	execute(message, args) {
    const amount = parseInt(args[0]);

    if (isNaN(amount) || (amount < 2 || amount > 100)){
      return message.reply('Please enter a valid integer between 2 and 100');
    } else {
      message.channel.bulkDelete(amount, true).catch(err => {
        console.error(err);
        message.channel.send('There was an error trying to prune messages in this channel!')
      });
    }
	}
};
