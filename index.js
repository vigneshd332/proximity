const cheerio = require("cheerio");
const request = require("request");
const tts = require('google-tts-api');
const Discord = require('discord.js');
const ytdl = require('ytdl-core');
const watson = require('watson-developer-cloud');
const fs = require('fs').promises;
const image_classify = require('./image_classify');
const print = require('./print');
const util = require('util');
const download = util.promisify(require('download-file'));
const logger = require("heroku-logger");

const usage = new Discord.RichEmbed()
  .setTitle("Invalid Usage!")
  .setColor(0xFF0000)
  .setDescription(".ttmp3 <message less than or equal to 200 characters>");

let awaiting = [];

const client = new Discord.Client();

const queue = new Map();

client.once('ready', () => {
	console.log('Ready!');
	client.user.setActivity("v3.1.1 'Pink Kestrel' | Reading Taking over The World 101").catch(logger.error);
});

client.once('reconnecting', () => {
	console.log('Reconnecting!');
});

client.once('disconnect', () => {
	console.log('Disconnect!');
});
client.on('message' , msg =>{
    //If the message is from the bot then do nothing
    if(msg.author.bot) return;
    else{
        //checks the image and returns a promise.
        const image = image_classify.isImage(msg); //image_check is a function requied from another file
        image.then(
            (value) => {
            //checks the type of the promis value. If it is a stirng then run the first block. 
            if(typeof(value) == "string"){
                console.log("it is a string")
                //msg.reply("it is not an image");
                //insert watson conversation here
            }
            else{
                let replyMessage = print.getMessage(value);
                msg.reply(replyMessage);
            }
               console.log(value);
        });

    }
});
client.on('message', message => {
  if (awaiting.includes(message.author.id)) return;

  if (message.content.startsWith(`${process.env.prefix}tts`)) {
    message.delete(100);
    awaiting.push(message.author.id);
    let lang = message.content.split(" ")
    let act = lang[1];
    let toMp3 = message.content.split(" ");
    toMp3.shift();
    toMp3.shift();
    toMp3 = toMp3.join(" ");

    let options = {
      directory: `././audio`,
      filename: `${message.author.id}.mp3`
    }

    tts(toMp3, act, 1)
      .then(url => {
        download(url, options)
          .then(() =>
            message.channel.send({
              files: [{
                attachment: `${options.directory}/${options.filename}`,
                name: `${message.author.id}.mp3`
              }]
            })
          )
          .then(msg => {
            //fs.unlink(`${options.directory}/${options.filename}`)
            removeAwaiting(message.author.id);
          })
          .catch(err => {
            console.error(error);
            removeAwaiting(message.author.id);
          });
      })
      .catch(err => {
        message.channel.send(usage);
        removeAwaiting(message.author.id);
      });
  }
});


function removeAwaiting(id) {
  awaiting = awaiting.filter(awaiter => awaiter != id);
}
client.on("message", function(message) {
 
    var parts = message.content.split(" "); // Splits message into an array for every space, our layout: "<command> [search query]" will become ["<command>", "search query"]
 
    /* Simple command manager */
    if (message.content.startsWith(`${process.env.prefix}image`)) { // Check if first part of message is image command
 
        // call the image function
        image(message, parts); // Pass requester message to image function
 
    }
 
});

client.on('message', async message => {
	if (message.author.bot) return;
	if (!message.content.startsWith(process.env.prefix)) return;

	const serverQueue = queue.get(message.guild.id);

	if (message.content.startsWith(`${process.env.prefix}play`)) {
		execute(message, serverQueue);
		return;
	} else if (message.content.startsWith(`${process.env.prefix}skip`)) {
		skip(message, serverQueue);
		return;
	} else if (message.content.startsWith(`${process.env.prefix}stop`)) {
		stop(message, serverQueue);
		return;
	} else if (message.content.startsWith(`${process.env.prefix}blyat`)) {
		message.channel.send('сука блять!')
	} else if (message.content.startsWith(`${process.env.prefix}babushka`)) {
		message.channel.send('Yeah, she is drunk or smoking weed right now.')
	} else if (message.content.startsWith(`${process.env.prefix}nettle`)) {
		message.channel.send('The Italian? Sta ballando con la musica tarantella.')
	} else if (message.content.startsWith(`${process.env.prefix}vk`)) {
		message.channel.send('Ah! The great Vk, he is doing his job, saving the world.')
	} else if (message.content.startsWith(`${process.env.prefix}tarantella`)) {
		message.channel.send('!play https://www.youtube.com/watch?v=QNwC8eZ7brE')
	} else if (message.content.startsWith(`${process.env.prefix}pizza`)) {
	 	message.channel.send(':pizza: Me-a already had a lot-a pizza :pizza:')
	} else if (message.content.startsWith(`${process.env.prefix}help`)) {
	 	message.channel.send(`**${process.env.prefix}play**` + ' **<link> :** Plays audio from video in link.')
                message.channel.send(`**${process.env.prefix}stop**` + ' **:** Stops playback.')
                message.channel.send(`**${process.env.prefix}skip**` + ' **:** Skips to next song in queue.')
                message.channel.send(`**${process.env.prefix} image**` + ' **<search term> :** Displays images related to the search term.')
                message.channel.send(`**${process.env.prefix}bruh**` + ' **:** Displays a bruh gif.')
                message.channel.send(`**${process.env.prefix}tts**` + ' **<language accent> <text>:** Converts text in any script to audio.')
                message.channel.send('** Language accents: en, it, jp, ru, etc.**')
		message.channel.send('I automatically analyze all uploaded images to recognize them. **Linked images are not recognized.** ')
		message.channel.send('Contact **Vish** if I am not working or borked.')
		message.channel.send('(P.S Boot his a** if he does not respond)')
		return;
	} else if (message.content.startsWith(`${process.env.prefix}about`)) {
	 	message.channel.send('Well, Well. I see you are interested. But I am taken. Sorry!')
                message.channel.send('**Version :** v3.1.1 "Pink Kestrel"')
                message.channel.send('**Build Date :** 8/3/2020')
                message.channel.send('**Hosted on :** Heroku (Stack 18)')
                message.channel.send('Built using **Node.js**')
		message.channel.send('We <3 Open-Source!')
		message.channel.send('Proudly hosted on **GitHub**. Licensed with **GPL v3.0**')
                message.channel.send('**Git :** https://github.com/vigneshd332/bot-discord-random')
		message.channel.send('**Message from Vish :** Relax, she is not gonna take over the world. Believe me. Its all under control.')
		message.channel.send('https://tenor.com/view/under-control-its-under-control-thumbs-up-we-got-this-dont-worry-gif-14366687')
		return;
	} else if (message.content.startsWith(`${process.env.prefix}bruh`)) {
		message.channel.send('https://tenor.com/view/bruh-gif-13889648')
	} else if (message.content.startsWith(`${process.env.prefix}image`)) {
		return;
        } else if (message.content.startsWith(`${process.env.prefix}tts`)) {
		return;
        } else if (message.content.startsWith(`${process.env.prefix}sarosh`)) {
		message.channel.send('Poor soul got his ass eaten by a raving bitch (Yeah you, **charlyy**). Lets play osu! to mourn his passing.')
	} else {
		message.channel.send('I dont know what you are talking about! ')
	}
});

async function execute(message, serverQueue) {
	const args = message.content.split(' ');

	const voiceChannel = message.member.voiceChannel;
	if (!voiceChannel) return message.channel.send('You need to be in a voice channel to play music!');
	const permissions = voiceChannel.permissionsFor(message.client.user);
	if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
		return message.channel.send('I need the permissions to join and speak in your voice channel!');
	}

	const songInfo = await ytdl.getInfo(args[1]);
	const song = {
		title: songInfo.title,
		url: songInfo.video_url,
	};

	if (!serverQueue) {
		const queueContruct = {
			textChannel: message.channel,
			voiceChannel: voiceChannel,
			connection: null,
			songs: [],
			volume: 5,
			playing: true,
		};

		queue.set(message.guild.id, queueContruct);

		queueContruct.songs.push(song);

		try {
			var connection = await voiceChannel.join();
			queueContruct.connection = connection;
			play(message.guild, queueContruct.songs[0]);
		} catch (err) {
			console.log(err);
			queue.delete(message.guild.id);
			return message.channel.send(err);
		}
	} else {
		serverQueue.songs.push(song);
		console.log(serverQueue.songs);
		return message.channel.send(`${song.title} has been added to the queue!`);
	}

}

function skip(message, serverQueue) {
	if (!message.member.voiceChannel) return message.channel.send('You have to be in a voice channel to stop the music!');
	if (!serverQueue) return message.channel.send('There is no song that I could skip!');
	serverQueue.connection.dispatcher.end();
}

function stop(message, serverQueue) {
	if (!message.member.voiceChannel) return message.channel.send('You have to be in a voice channel to stop the music!');
	serverQueue.songs = [];
	serverQueue.connection.dispatcher.end();
}

function play(guild, song) {
	const serverQueue = queue.get(guild.id);

	if (!song) {
		serverQueue.voiceChannel.leave();
		queue.delete(guild.id);
		return;
	}

	const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
		.on('end', () => {
			console.log('Music ended!');
			serverQueue.songs.shift();
			play(guild, serverQueue.songs[0]);
		})
		.on('error', error => {
			console.error(error);
		});
	dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
}
function image(message, parts) {
	const args = message.content.split(' ');

	/* extract search query from message */

	var search = parts.slice(1).join(" "); // Slices of the command part of the array ["!image", "cute", "dog"] ---> ["cute", "dog"] ---> "cute dog"

	var options = {
	    url: "http://results.dogpile.com/serp?qc=images&q=" + search,
	    method: "GET",
	    headers: {
	        "Accept": "text/html",
	        "User-Agent": "Chrome"
	    }
	};
	request(options, function(error, response, responseBody) {
		if (error) {
			// handle error
			return;
		}

		/* Extract image URLs from responseBody using cheerio */

		$ = cheerio.load(responseBody); // load responseBody into cheerio (jQuery)

		// In this search engine they use ".image a.link" as their css selector for image links
		var links = $(".image a.link");

		// We want to fetch the URLs not the DOM nodes, we do this with jQuery's .attr() function
		// this line might be hard to understand but it goes thru all the links (DOM) and stores each url in an array called urls
		var urls = new Array(links.length).fill(0).map((v, i) => links.eq(i).attr("href"));
		console.log(urls);
		if (!urls.length) {
			// Handle no results
			return;
		}

		// Send result
		message.channel.send( urls[0] );
	});
}
client.login(process.env.token);
