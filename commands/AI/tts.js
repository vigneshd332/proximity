const util = require('util');
const Discord = require('discord.js');
const download = util.promisify(require('download-file'));
const tts = require('google-tts-api');
const usage = new Discord.MessageEmbed()
  .setTitle("Invalid Usage!")
  .setColor(0xFF0000)
  .setDescription(`${process.env.prefix}tts` + " <language accent eg: en, ru, it, ja> <message less than or equal to 200 characters>");

let awaiting = [];


module.exports = {
    name: 'tts',
    description: 'Text to speech powered by Google. Use '+`${process.env.prefix}tts `+'<text>',
    aliases: ['tts'],
    execute(message, args) {
    awaiting.push(message.author.id);
    let lang = message.content.split(" ")
    let act = lang[1];
    let toMp3 = message.content.split(" ");
    toMp3.shift();
    toMp3.shift();
    toMp3 = toMp3.join(" ");
    let member = message.guild.member(message.author);
    let nickname = member ? member.displayName : null;
    if(!toMp3){message.channel.send(usage);
      return;
    }
    toMp3 = nickname + " says " + toMp3;
    
    let options = {
      directory: `././audio`,
      filename: `${message.author.id}.mp3`
    }
   
    if (act === "en" || act === "it" || act == "hi" || act === "ru" || act === "en-US" || act === "en-UK" ){ tts(toMp3, act, 1)
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
            console.error(err);
            removeAwaiting(message.author.id);
	    return;
          });
      })
      .catch(err => {
        message.channel.send(usage);
        removeAwaiting(message.author.id);
      });
      } 
	  else { 
		  removeAwaiting(message.author.id);
		  message.channel.send(usage);
      } 
      
      function removeAwaiting(id) {
        awaiting = awaiting.filter(awaiter => awaiter != id);
      } 
  }
  
};



