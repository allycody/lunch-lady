const keys = require('./keys.js')
const clientId = keys.clientId
const clientSecret = keys.clientSecret
const botToken = keys.botToken
var Botkit = require('botkit');

var controller = Botkit.slackbot({
	clientId,
  clientSecret,
  scopes: ['bot'],
});

var bot = controller.spawn({
  token: botToken
})

bot.startRTM(function(err,bot,payload) {
  if (err) {
    throw new Error('Could not connect to Slack');
  }

  // close the RTM for the sake of it in 5 seconds
  // setTimeout(function() {
  //     bot.closeRTM();
  // }, 5000);
});


controller.hears(['hello', 'hi'], 'direct_message,direct_mention,mention', function(bot, message) {


    bot.reply(message, "Hi")


  
});

