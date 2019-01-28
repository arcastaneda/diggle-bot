# diggle-bot
A simple Slack chatbot integration using Azure Functions


I wanted to create a simple, easy to use, and easy to understand chatbot that integrates with the Slack API. I wrote it in javascript because that's what I know best at the moment! The bot listens in for a mention and reply with user-defined text (e.g. user says "@diggle-bot hello world!", diggle-bot will reply). I chose to use the chat.postmessage API, as it's fairly straight forward, and probably the most interesting to start with from a bot-interaction starting point. (https://api.slack.com/methods/chat.postMessage)


What you will need:
1) A slack account with permissions. You will need permissions to create a customer application and bot within the workspace. 
2) An Azure account. You can create a 30-day free account with an email and 5 minutes. https://azure.microsoft.com/en-us/offers/ms-azr-0044p/
3) The desire to learn!

Let's go!
Assuming you have the accounts and permisions mentioned above, first start off by creating an application and bot within your slack workspace. To do this, navigate to your "manage apps" window by clicking into "administration" from the menu options (or go to https://{YOUR_DOMAIN}.slack.com/apps/manage)
