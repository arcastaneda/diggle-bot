// diggle-bot event handler. every time digglebot is mentioned in chat, it triggers the event
// Axios module is requied. Make sure you have installed the axios module using `npm install axios` in
// the function directory by using the diagnostic console found by navigating to
// (Function > Platform Features > Diagnostics Console (kudu))


//create the axios object which will eventually send the POST to slack
var axios = require('axios');

//variables that eventually need to be hidden in config files
var BOT_TOKEN = "{your bot token here}" ;
var API_TOKEN = '{your api token here}';
var SLACK_URL = "https://slack.com/api/chat.postMessage" ;

module.exports = async function (context, data){
    //data is the message object received from slack
    //grab the event information from data and store it
    var slack_event = data.body.event;

    //when setting up the function you need to authenticate it to slack
    //slack sends a challenge in the event data
    //reply back to answer the challenge to authenticate, otherwise ignore
    if (data.body.challenge){
        context.log('challenge: '+ data.body.challenge);
        return {
            "challenge": data.body.challenge
        };
    };
    context.log('Not a slack api challenge');

    //ignore bot calling itself and dividing by zero
    if ("bot_id" in slack_event) {
        context.log('Ignore bot event');

    } else {
        //pull the text from the message and store it into a variable for the bot's response
        context.log('Starting message build...');
        var text = slack_event.text ;
        var response = "You said: " + text ;

        //set the channel slackbot will reply to
        var channel_id = slack_event.channel;
        
        //build the payload and stringify it
        var payload = JSON.stringify({
            "token": BOT_TOKEN,
            "channel": channel_id,
            "text": response
        });

        //call the generic sendMessage function with the payload
        SendMessage (context, payload);
    }; 
}

function SendMessage (context, payload){
    //use axios to send the payload, ensure headers are correctly set
    axios.post(SLACK_URL, payload, {
        headers: {
            'Content-type' : 'application/json', 
            'Authorization' : "Bearer " + BOT_TOKEN   
        }
    });
    context.log("Payload sent!");
}
