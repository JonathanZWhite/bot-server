# Bare Bones Telegram Bot Server
Basic server architecture for bots, this implementation uses Telegram. This is a fork of [@JonathanZWhite's](www.github.com/JonathanZWhite/bot-server) server side bot artchitecture project.

You can find his article on server arch when bots invade  [here](https://medium.com/@JonathanZWhite/server-side-infrastructure-when-bots-invade-a2252e9d4bc9).


### Installation
##### Node
Run `$ npm install`

#### Create New Telegram Bot
1. Go into Telegram, talk to [BotFather](https://telegram.me/botfather).
2. Create a new bot.
3. Take the telegram token and add it to your environment variables or update `/config/index.js`
4. If you want to set your environment variable run `$ export TELEGRAM_TOKEN=your_token_here`

### Running
1. Run `$ npm start`
2. Text the bot you made during the installation process
3. Try saying 'Hi'
