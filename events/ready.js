module.exports = (client, message) => {

    console.log(`Signed in as: ${client.user.tag}`);
    console.log(`client.config.prefix: ${client.config.prefix}`);

    client.user.setStatus('Available');
    client.user.setPresence({ activity: { name: "Some random Netflix show" } });
    try {
        client.user.setPresence({ activity: { type: "WATCHING", name: "the console logs", url: "https://vigneshd332.github.io/proximity/" } });
    } catch (err) {
        console.log(err)
    }

}
