const fs = require('fs')

exports.run = (client) => {
    // load events
    fs.readdir("./events", (err, files) => { // read the events folter
        if (err) return console.error(err)
        files.forEach(file => { // for each js file, require it
            if (!file.endsWith(".js")) return;
            const event = require(`../events/${file}`);
            let eventName = file.split(".")[0];
            client.on(eventName, event.bind(null, client));
            console.log(`Successfully loaded: ${eventName} | Event`)
        });
    });
}