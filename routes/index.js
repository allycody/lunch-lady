const express = require('express');
const router = express.Router();
const keys = require('../keys.js')
const request = require('request');
const clientId = keys.clientId
const clientSecret = keys.clientSecret

router.get('/', function(req, res, next){
	res.send('done')

})


router.get('/oauth', function(req, res, next){
	if (!req.query.code) {
        res.status(500);
        res.send({"Error": "Looks like we're not getting code."});
        console.log("Looks like we're not getting code.");
    } else {
        // If it's there...

        // We'll do a GET call to Slack's `oauth.access` endpoint, passing our app's client ID, client secret, and the code we just got as query parameters.
        request({
            url: 'https://slack.com/api/oauth.access', //URL to hit
            qs: {code: req.query.code, client_id: clientId, client_secret: clientSecret}, //Query string data
            method: 'GET', //Specify the method

        }, function (error, response, body) {
            if (error) {
                console.log(error);
            } else {
                res.json(body);

            }
        })
    }

    // Route the endpoint that our slash command will point to and send back a simple response to indicate that ngrok is working
    // router.get('/', function(req, res) {
    //     res.send('Your ngrok tunnel is up and running!');
    // });

})



module.exports = router