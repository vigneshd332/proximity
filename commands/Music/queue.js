const { MessageEmbed } = require('discord.js');
const colours = require('../../colours.json');
const parent = require('../../bot.js')
module.exports = {
	name: 'queue',
	description: 'Displays current queue.',
    cooldown: 3,
    aliases: ['q'],
    execute(message) {
        currentGuild = message.guild

        function queue_to_text(queue) {
            queueSize = queue.songs.length

            if (queueSize > 10) {
                max_loop = 11
                songsLeft = queueSize - 10
                numberUpcoming = 10
            } else {
                max_loop = queueSize
                songsLeft = queueSize - 1
                numberUpcoming = queueSize
            }

            console.log(queue.songs)

            data = new MessageEmbed({type: "rich"})
                .setTitle(`Music Queue`)
                .setColor(colours.gold)
                .setDescription(`These are the next  songs of the playlist`)
                .setThumbnail(currentGuild.iconURL())
                .addField(`**NOW PLAYING**`, `${queue.songs[0].title} by ${queue.songs[0].channel}\n---------------------------------------------------`)
                .setFooter(`Proximity | ${songsLeft} songs left`, parent.client.user.displayAvatarURL())

            for (i = 1; i < max_loop; i++) {
                currentSong = queue.songs[i]
                console.log(currentSong)
                data.addField(`#${i} `, `Song Title: **${currentSong.title}** by **${currentSong.channel}**`)
            }
            return data
        }

        const serverQueue = message.client.queue.get(message.guild.id);

        console.log(!serverQueue)

        if (!serverQueue) return message.channel.send('There is nothing playing.');
        queue_embed= queue_to_text(serverQueue)
        message.channel.send(queue_embed)
	}
};
