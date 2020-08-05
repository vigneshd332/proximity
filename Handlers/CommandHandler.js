const fs = require('fs');



exports.run = async (client) => {

    const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

    //Stores all the command js files into a map of the commands under the client object
    for (const file of commandFiles) {
        const command = require(`./commands/${file}`);
        client.commands.set(command.name, command);
    }
    async function load_command_from_directory(command_category) {
        fs.readdir(`./commands/${command_category}`, (err, files) => {
            if (err) return console.error(err);
            files.forEach(file => {
                if (!file.endsWith('.js')) return;
                let subCommands= require(`../commands/${command_category}/${file}`);
                //console.log(`ATTEMPTING TO LOAD: ${adminCommands.name} `);
                client.commands.set(subCommands.name, subCommands);
                console.log(`Successfully Loaded: ${subCommands.name} | Command`)
            });
        });
    }
    //Dict storing command categories as defined in the sub-directories of the commands folder
    var command_categories = {
        music: "Music",
        moderation: "Moderation",
        general: "General",
        ai: "AI"
    }

    //Iterates through 
    for (var command in command_categories) {
        var value = command_categories[command];
        load_command_from_directory(value)
    }


}