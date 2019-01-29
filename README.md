# diggle-bot

A simple Slack chatbot integration using Azure Functions


I wanted to create a simple, easy to use, and easy to understand chatbot that integrates with the Slack API. I couldn't find any "easy" level tutorial online during my journey, so I figured I would give back to the community by writing one myself!! (Feedback on this code and tutorial is greatly appreciated!) I wrote it in javascript because that's what I know best at the moment. The bot listens in for a mention and reply with user-defined text (e.g. user says "@diggle-bot hello world!", diggle-bot will reply). I chose to use the chat.postmessage API, as it's fairly straight forward, and probably the most interesting to start with from a bot-interaction starting point. (https://api.slack.com/methods/chat.postMessage) Slack offers many other interesting API endpoints that cover many other functions, but we won't go over those here. 


What you will need:
1) A slack account with permissions. You will need permissions to create a customer application and bot within the workspace. 
2) An Azure account. You can create a 30-day free account with an email and 5 minutes. https://azure.microsoft.com/en-us/offers/ms-azr-0044p/
3) The desire to learn!



Let's go!

Assuming you have the accounts and permisions mentioned above, first start off by creating an application and bot within your slack workspace. To do this, navigate to https://api.slack.com/apps?new_app=1 and fill in the prompt with an app name (diggle-bot in my case) and select your workspace. Use the left side menu to get to Bot Users. Fill in the information with a display name and default username for your bot, they can be the same thing. Check the "always show my bot as online" button to "on". Save changes.  

Next, go to OAuth & Permissions. This will create tokens for our app to post into slack using the API. Try to keep these secret! Click the Install App to Workspace button and follow the prompts. Give your app permissions to post to whatever channels you want. I created a separate "development" channel in slack and only gave my bot permisisons to that, so it wouldn't inadvertantly annoy other users while I tinkered. Slack will present you with 2 OAuth access tokens, copy these down on notepad as you will need easy access to both later. Scroll down to "Scopes", you should see `Post to specific channels in slack` already there. Type `chat` into the search bar, you should see an option for `Send mesages as {bot name} chat:write:bot`. Select this and click save. (note, add `post to specific channels in slack` if it's not there). 

Next, navigate to "Event Subscriptions" and switch this on. This will send an event package to the URL you specify based on desired triggers. In this case, the URL will be our Azure Function, and the trigger will be a @mention of the bot. Leave this page open and switch to Azure. 

In azure, click "create resource" on the top left and select "serverless function app". Give your app a unique name, select your trial subscription, create/name a new resource group if you don't have one already (any simple name is fine), Leave OS as Windows, Hosting plan to Consumption Plan, Location to wherever is closest to you, Runtime Stack to JavaScript, create new storage with the default name. Select Create and wait for it to complete, should only take a few moments. Once it's created, Azure should notify you in the top right. Click (or type into search) "Function Apps" from the menu and select your newly created Function by clicking on it's name. Click the plus sign next to the word Functions underneath your app's name to create a new script (you might have to hover over the word Functions to see the + sign). Select "In portal" and continue. Select "Webhook + API" and Create. Unless you specify a name, the default will be `HttpTrigger1` which is totally fine for now. 

We need to install the axios module which unfortunately isn't included by default in the runtime environment. Click the top level name of your function (next to the lightning bolt icon), you will be brought to the function's overview page page. Click the "Platform Features" tab at the top next to Overview. Click "Advanced Tools (kudu)" in the Development section. This will open a new page with some neat advanced tools for functions. Click and open Debug Console and pick CMD to open a debug console. Either click your way or "cd" to the `D:\home\site\wwwroot\{yourtrigger}` (most likely HttpTrigger1) directory. From this directory, run the command `npm init` and follow the prompts to create a `package.json` module repo. Give it a name and description, but feel free to leave the rest of the fields blank for default values. 

Once this is done you should see a `package.json` file created in the view above the console. Run the following command to install the axois module `npm install axios`. Ignore the warnings because cool kids don't code by the rules. (seriously though the warnings are just to let you know that you're not following best practices, don't play fast and loose in real life). You can now close the Diagnostics tab. 

Back in the functions tab, click your trigger you created (default HttpTrigger1). This should bring you to a page with code called `index.js`. You can copy/paste the code from my index.js file directly into the portal's `index.js`. Copy/Paste in your Bot and Auth tokens to the variables at the top of the file (In an ideal world, you would pass in environment variables but we're just trying to make this quick) and click save. On the right side of the screen, click the word "View Files" to expand the files tab, and select `function.json`. Copy my `function.json` code into this file and click save. Next to the "Run" button, click the link for "get Function URL" and copy the Default function key. Keep this tab open and go back to your slack tab which should still have the "event subscriptions" page open.

Paste the Function's URL into the Request URL field on slack. You should see a green `Verified` appear with a checkmark! Stay on this page and scroll down to "Subscribe to Bot Events". Click "Add Bot User Event" and select `app_mention`. This is what will send off an event to our Function's trigger and execute the app. 

Time to test! Invite your bot into the channel that you gave it permissions to earlier. Type something like @{diggle-bot} Hello world! Voila! The bot should respond with some text! If it doesn't work, go back to the azure functions page with the `index.js` file and click `Logs` at the bottom to open up the console. With the console open, type another message mentioning the bot and see if it throws a meaningful error. You might need to refresh the entire page to get the console to work, it's a little finnicky.

Best of luck in your learning! Let me know if something doesn't work or you get stuck!

-Anthony
