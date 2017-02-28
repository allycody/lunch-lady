const keys = require('./keys.js')
const clientId = keys.clientId
const clientSecret = keys.clientSecret
const botToken = keys.botToken
const request = require('request')

const Botkit = require('botkit');

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


console.log("CONTROLLER: ", controller)
controller.on('direct_mention', function(bot, message){
  request({
            url: 'https://slack.com/api/users.info', //URL to hit
            qs: {client_id: clientId, client_secret: clientSecret, user:message.user, token:keys.authToken}, //Query string data
            method: 'GET', //Specify the method

        }, function (error, response, body) {
            if (error) {
                console.log(error);
            } else {
              body = JSON.parse(body)
              console.log("body: ", body)
              const name = body.user.profile.first_name
              if(name !== "Griffin"){
                bot.reply(message, "I only answer to Griffin")
                console.log("this: ", this)
                console.log("CONTROLLER CONVO COUNT: ", controller.convoCount)
              }
              else{
                bot.reply(message, "Hi")

              }

            }
          })
  
})

controller.hears(['hello', 'hi'], 'direct_message,direct_mention,mention', function(bot, message) {



    console.log("message: ", message)
    request({
            url: 'https://slack.com/api/users.info', //URL to hit
            qs: {client_id: clientId, client_secret: clientSecret, user:message.user, token:keys.authToken}, //Query string data
            method: 'GET', //Specify the method

        }, function (error, response, body) {
            if (error) {
                console.log(error);
            } else {
              body = JSON.parse(body)
              console.log("body: ", body)
              const name = body.user.profile.first_name
              if(name !== "Griffin"){
                bot.reply(message, "I only answer to Griffin")
                console.log("this: ", this)
                console.log("CONTROLLER CONVO COUNT: ", controller.convoCount)
              }
              else{
                bot.reply(message, "Hi")

              }

            }
          })
  
});

