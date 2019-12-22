const cheerio = require("cheerio");
const request = require("request");
const Discord = require('discord.js');
const ytdl = require('ytdl-core');
var VisualRecognitionV3 = require('watson-developer-cloud/visual-recognition/v3');
var fs = require('fs');


const client = new Discord.Client();

const queue = new Map();

/*client.once('ready', () => {
	console.log('Ready!');
});*/
client.on("ready", () => {
	/* Log */ console.log("Blyatman is now up and running!");
	client.user.setActivity('image databases', { type: 'WATCHING' })
	.then(presence => 
		/* Log */ console.log(`Status updated succesfully.\n==================================================`))
  	.catch("There was an error updating the status");
});

client.once('reconnecting', () => {
	console.log('Reconnecting!');
});

client.once('disconnect', () => {
	console.log('Disconnect!');
});
client.on("message", function(message) {
 
    var parts = message.content.split(" "); // Splits message into an array for every space, our layout: "<command> [search query]" will become ["<command>", "search query"]
 
    /* Simple command manager */
    if (message.content.startsWith(`${process.env.prefix}image`)) { // Check if first part of message is image command
 
        // call the image function
        image(message, parts); // Pass requester message to image function
 
    }
 
});
client.on("message", (message) => {
	if (message.content.startsWith(`${process.env.prefix}ir`)) {
	  var args = message.content.substring(1).split(' ')[1];

	  try {
		  if (!args.includes("grabify")){
			  if(args.includes("http") || args.includes("www") && ((args.includes("jpeg") || args.includes("jpg") || args.includes("png") || args.includes("image")))) {
				  /* Log */ console.log("Valid image found.");
					 message.channel.startTyping(3);
				  message.channel.send("This seems legit. Lemme analyze it with my 3 human neurons...")
				  var imageID = Math.floor(Math.random()*9000000000) + 1000000000;
				  /* Log */ console.log("Generated random ID for the image. (" + imageID + ")")
				  var request = require('request');
				  const stream = request(args).pipe(fs.createWriteStream("./temp/" + imageID + '.png'))
				  stream.on('finish', () => {
					console.log("Image downloaded.\nRunning IBM's API.");
					  var visualRecognition = new VisualRecognitionV3({
						  url: 'https://api.us-south.visual-recognition.watson.cloud.ibm.com/instances/b79e80d4-d653-4713-8abf-c629b018cba5',
							 version: '2018-03-19',
						  iam_apikey: process.env.watson_key
					  });
						var images_file= fs.createReadStream("./temp/" + imageID + ".png");
					  var params = {
						  images_file: images_file,
						  threshold: 0.5
					  };
					  visualRecognition.classify(params, function(err, response) {
						  if (err){
							  /* Log */ console.log("Image recognition failed!");
						  }
						  else{
							  var stringResult = (JSON.stringify(response.images[0].classifiers[0].classes[0].class, null, 2)).replace(/"/g,"");
							  /* Log */ console.log("Prediction: " + stringResult);
							  switch(stringResult.charAt(0)){
								  case "a": case "e": case "i": case "o": case "u":
									  message.channel.send("Okay, my advanced mind thinks it is an " + stringResult);
									  break;
								  default:
									  message.channel.send("Okay, my advanced mind thinks it is a " + stringResult);
									  break;
							  }
							  /* Log */ console.log("==================================================")
						  }		
					  });
					  fs.unlink("./temp/" + imageID + ".png", (err) => {
						  if (err) {
							  /* Log */ console.log("There was an error deleting the image :(");
						  } else {
							  /* Log */ console.log('Image deleted succesfully!');                                
						  }
						  message.channel.stopTyping(true);
					  });
				  });	
			  } else if (args.includes("shut") || args.includes("fuck") || args.includes("ass") || args.includes("nigger") || args.includes("bitch") || args.includes("kid") || args.includes("retard")){
				  message.guild.fetchMember(message.author).then(member => {
					  message.channel.send("you nigger have big gay " + member, {
						 // file: "./content/boi.mp3"
					  });
					});		
			  } 
			  else if (args.includes("http") || args.includes("www") && !(args.includes("jpeg") || args.includes("jpg") || args.includes("png") || args.includes("image"))){
				  message.channel.send("Your link is broke as fuck bro");
			  }  
			  else {
				  message.channel.send("wtf I think someone just mistook me for Google Assistant", {
					  //file: "./content/wat.png"
				  });
				  setTimeout(function () {
					  message.channel.send("bitch");
				  }, 2500);
			  }     
		  }
		  else
		  {
			  message.channel.send("good try");
		  }
	  }
	  catch (err){
		  message.channel.send("Oof, I crashed");
	  } 
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
	} else if (message.content.startsWith(`${process.env.prefix}image`)) {
		return;
    } else if (message.content.startsWith(`${process.env.prefix}sarosh`)) {
		message.channel.send('Poor soul got his ass eaten by a raving bitch (Yeah you, **charlyy**). Lets play osu! to mourn his passing.')
	}else {
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