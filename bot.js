
//PACKAGES
const Discord = require('discord.js');
const Canvas = require('canvas');
const fs = require('fs');
const path = require('path')

//Fetches secret info from the environment variable
require('dotenv-flow').config();

//Global Variables
const Client = require('./struct/Client');
const client = new Client({ token: process.env.token, prefix: process.env.prefix, youtubeKey: process.env.youtubeKey , ownerID: process.env.ownerid});

//Initiates the Command and Event Handlers
fs.readdir('./Handlers/', (err, files) => {
    if (err) return console.error(err)

    files.forEach(file => {

        const event = require(path.join(__dirname, "Handlers", file));
        event.run(client);

    })
});

//Logs into Client
client.login(client.config.token);


exports.client = client;
