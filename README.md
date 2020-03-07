# A Discord Bot
##### bot-discord-random
Just a thing I've been working on, a bot for Discord. I'm currently hosting my bot on Heroku. Feel free to contact or ask me anything by opening an issue.

Right now, the bot can:
* Play Songs
* Search Images
* Convert Text to Speech
* Recognize & Classify Images (requires an IBM Cloud account to use IBM Watson)

#### Environment variables (Config Vars) to configure in Heroku:
* prefix = the command prefix for bot (usually it is !) [Example: ! or ~].
* token = Your unique Discord API Token from the bot's account.
* watson_key = Your unique IBM API key from IBM Cloud.
* watson_url = The URL in IBM Cloud with the API Key.

#### Commands:
* \<prefix>play \<url> : Plays audio from video in url.
* \<prefix>stop : Stops playback.
* \<prefix>skip : Skips to next song in queue.
* \<prefix>image \<search term> : Displays images related to the search term.
* \<prefix>bruh : Displays a bruh gif.
* \<prefix>tts \<language accent> \<text>: Converts text in any script to audio.
* The bot automatically analyzes all uploaded images to classify them.

** Language accents: en, it, jp, ru, etc.**
## To deploy a version of this bot to your Heroku account:

It's better to do it in order.

### Stuff to do in Discord:
* Get a Discord account (Because, Duh!)
* Create an application and profile for your bot and add it to your server. (Look it up on Youtube if you find it tough)
* Give these permissions to your bot: Connect, Speak, Send Messages and Manage Messages.
* Do all the authorization stuff.
* Keep a copy of your bot's token (privately).

### Stuff to do in IBM Cloud:
* Create an account
* Create a Visual Recognition resource (the Lite free plan is enough).
* Find the The Api Key and Url in the resource details and keep a copy of it (again, privately),

### Stuff to do in Heroku:
[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/vigneshd332/bot-discord-random)
* Hit the button above and login,
* You must see your bot should be building in the application logs or in the overview. If not, then manually deploy it.
* Start the worker dyno "npm start" in the overview. The "web" dyno switches off randomly so its better to keep it off.
### Pro Tips:
* Keep an eye on the application logs in Heroku to find out any problems.
* Heroku gives only 450 free hours a month, simply adding credit card details will will give an extra 550 hours.
* The Visual Recognition feature only works for images uploaded by users in the server, it does not work on links.
* The IBM Visual Recognition service deletes itself if inactive for a month.
