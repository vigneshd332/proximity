# A Discord Bot
##### bot-discord-random
Just a thing I've been working on, a bot for Discord. I'm currently hosting my bot on Heroku. Feel free to contact or ask me anything by opening an issue.

Right now, the bot can:
* Play Songs
* Search Images
* Recognize & Classify Images (requires an IBM Cloud account to use IBM Watson)

#### Environment variables (Config Vars) to configure in Heroku:
* prefix = the command prefix for bot (usually it is !) [Example: ! or ~]
* token = Your unique Discord API Token from the bot's account.
* watson_key = Your unique IBM Watson API key from IBM Cloud

## To deploy a version of this bot to your Heroku account:

It's better to do it in order.

### Stuff to do in Discord:
* Get a Discord account (Because, Duh!)
* Create an application and profile for your bot and add it to your server. (Look it up on Youtube if you find it tough)
* Give these permissions to your bot: Connect, Speak, Send Messages and Manage Messages.
* Do all the authorization stuff.
* Keep a copy of your bot's token (privately).

### Stuff to do In Github:
* Get a Github Account. (Pls don't ask me how to do that)
* Fork this Repo.

### Stuff to do in IBM Cloud:
* Create an account
* Create a Visual Recognition resource (the Lite free plan is enough).
* Find the The Api Key in the resource details and keep a copy of it (again, privately),

### Stuff to do in Heroku:
* Create a Heroku Account and an application for the bot.
* Create the environment variables with names exactly as mentioned.
* Add the official nodejs buildpack and this buildpack: https://github.com/jonathanong/heroku-buildpack-ffmpeg-latest.git
  to "Buildpacks" in your bot's settings.
* Link **your** forked GitHub repo (not this one) to the application in the Deploy tab and enable Automatic deploys.
* You must see your bot should be building in the application logs or in the overview. If not, then manually deploy it.
* Create a worker dyno "node index.js" (if not present under dynos, already) and start it. The "web npm start" dyno switches off randomly so its better to keep it off.
### Pro Tips:
* Keep an eye on the application logs in Heroku to find out any problems.
* Heroku gives only 450 free hours a month, simply adding credit card details will will give an extra 550 hours.
* The Visual Recognition feature only works for images uploaded by users in the server, it does not work on links.
* The IBM Visual Recognition service deletes itself if inactive for a month.
