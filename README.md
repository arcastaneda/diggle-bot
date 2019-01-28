# diggle-bot
A simple Slack chatbot integration using Azure Functions


I wanted to create a simple, easy to use, and easy to understand chatbot that integrates with the Slack API. I wrote it in javascript because that's what I know best at the moment! The bot listens in for a mention and reply with user-defined text (e.g. user says "@diggle-bot hello world!", diggle-bot will reply). I chose to use the chat.postmessage API, as it's fairly straight forward, and probably the most interesting to start with from a bot-interaction starting point. (https://api.slack.com/methods/chat.postMessage)


What you will need:
1) A slack account with permissions. You will need permissions to create a customer application and bot within the workspace. 
2) An Azure account. You can create a 30-day free account with an email and 5 minutes. https://azure.microsoft.com/en-us/offers/ms-azr-0044p/
3) The desire to learn!

Let's go!
Assuming you have the accounts and permisions mentioned above, first start off by creating an application and bot within your slack workspace. To do this, navigate to https://api.slack.com/apps?new_app=1 and fill in the prompt with an app name (diggle-bot in my case) and select your workspace. Use the left side menu to get to Bot Users. Fill in the information with a display name and default username for your bot, they can be the same thing. Check the "always show my bot as online" button to "on". Save changes.  

Next, go to OAuth & Permissions. This will create tokens for our app to post into slack using the API. Try to keep these secret! Click the Install App to Workspace button and follow the prompts. Give your app permissions to post to whatever channels you want. I created a separate "development" channel in slack and only gave my bot permisisons to that, so it wouldn't inadvertantly annoy other users while I tinkered. Slack will present you with 2 OAuth access tokens, copy these down on notepad as you will need easy access to both later. 

Next, navigate to "Event Subscriptions" and switch this on. This will send an event package to the URL you specify based on desired triggers. In this case, the URL will be our Azure Function, and the trigger will be a @mention of the bot. Leave this page open and switch to Azure. 

In azure, click "create resource" on the top left and select "serverless function app". Give your app a unique name, select your trial subscription, create/name a new resource group if you don't have one already (any simple name is fine), Leave OS as Windows, Hosting plan to Consumption Plan, Location to wherever is closest to you, Runtime Stack to JavaScript, create new storage with the default name. Select Create and wait for it to complete.
