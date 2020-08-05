const request = require("request");
const cheerio = require("cheerio");

module.exports = {
    name: 'image',
    description: 'Image Search Powered by Dogpile',
    aliases: ['img'],
    execute(message, args) {
        var parts = message.content.split(" "); // Splits message into an array for every space, our layout: "<command> [search query]" will become ["<command>", "search query"]
            image(message, parts); // Pass requester message to image function
           
            function image(message, parts) {
                const args = message.content.split(' ');
                /* extract search query from message */
            
                var search = parts.slice(1).join(" "); // Slices of the command part of the array ["!image", "cute", "dog"] ---> ["cute", "dog"] ---> "cute dog"
                    console.log(search);
                var options = {
                    url: "https://www.dogpile.com/serp?qc=images&q=" + search + "&capv=" + process.env.captcha_key,
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
                    // console.log(urls);
                    if (!urls.length) {
                        // Handle no results
                        return;
                    }
            
                    // Send result
                    var size = urls.length;
                    if(size>5){
                    var end = Math.floor(Math.random() * 5)
                    message.channel.send( urls[end] );
                    }
                    else     {
                        var end2 = Math.floor(Math.random() * 5)
                        message.channel.send ( urls[end] );
                    }
                });
            }
      
    }
};
