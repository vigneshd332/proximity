const parent = require('../../bot.js');
const prefix = parent.client.config.prefix
const { MessageEmbed } = require('discord.js')
const colours = require('../../colours.json')
module.exports = {
    name: 'help',
    description: 'List all of my commands or info about a specific command.',
    aliases: ['commands'],
    usage: '[command name]',
    cooldown: 5,
    execute(message, args) {
        const data = [];
        const { commands } = message.client;

        if (!args.length) {

            //GENERAL HELP DM
            HEmbed = new MessageEmbed()
                .setTitle(`List of Commands`)
                .setDescription(`Here is a list of all my commands \nYou can send ${prefix}help [command name] to get info on a specific channel`)
                .setColor(colours.gold)
                .setThumbnail(parent.client.user.displayAvatarURL())
                .setFooter(`Proximity ${process.env.version}`, parent.client.user.displayAvatarURL())
            commands.forEach((command) => {
                HEmbed.addField(`${command.name}`, `${command.description}`, true)
            });
                
            

            return message.author.send({ split: true, embed: HEmbed })
                .then(() => {
                    if (message.channel.type === 'dm') return;
                    message.reply('I\'ve sent you a DM with all my commands!');
                })
                .catch(error => {
                    console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
                    message.reply('it seems like I can\'t DM you!');
                });
        }


        const name = args[0].toLowerCase();
        const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

        if (!command) {
            return message.reply('that\'s not a valid command!');
        }

        HEmbed = new MessageEmbed()
            .setTitle(`**Help on ${command.name}**`)
            .setThumbnail(message.guild.iconURL())
            .setColor(colours.gold)
            .addField(`**Name**`, `${command.name}`, true)
            .addField(`**Aliases**`, `${command.aliases.join(', ')}`, true)
            .addField(`**Description**`, `${command.description}`, true)
            .addField(`**Usage:**`, `${prefix}${command.name} ${command.usage}`, true)
            .addField(`**Cooldown:**`, `${command.cooldown || 3} second(s)`, true)
            .setFooter(`Proximity ${process.env.version}`, parent.client.user.displayAvatarURL())

        message.channel.send({ split: true, embed: HEmbed });
    },
};