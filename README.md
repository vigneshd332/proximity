# bot-discord-random
Just a thing I've been working on, a bot for Discord. I'm currently hosting my bot on Heroku. Feel free to contact or ask me anything by opening an issue.

Right now, the bot can:
* Play Songs
* Search Images
* Recognize & Classify Images (requires an IBM Cloud account to use IBM Watson)

Environment variables (Config Vars) to configure in Heroku:
* prefix = the command prefix for bot to (usually it is !) [Example: !command ~command]
* token = Your unique Discord API Token from the bot's account.
* watson_key = Your unique IBM Watson API key from IBM Cloud

To deploy a version of this bot to your Heroku account:
* Download a release package from the Releases Tab, (preferably the latest one)
* Unzip the contents to a folder
* Create an application for your bot in Heroku.
* Create the environment variables with names exactly as mentioned.
* Add the official nodejs and this buildpack: https://github.com/jonathanong/heroku-buildpack-ffmpeg-latest.git
  to "Buildpacks" in your bot's settings in Heroku.
* Push the files to your Heroku git (information on this can be found on the Heroku site on the deploy tab in your account).
* Create a worker dyno "node index.js" (if not present under dynos, already) and start it. The "web npm start" dyno switches off randomly     so its better to keep it off.
* Pro Tip: Keep an eye on the application logs in Heroku to find out any problems.
