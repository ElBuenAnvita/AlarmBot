# AlarmBot
Discord bot to disconnect someone from a call at a certain time.

## Commands
AlarmBot was created some time ago. This bot does not use the new slash commands system. 

Instead, the bot receive commands in the following way:

| Command | Description | Example | Response |
| --- | --- | --- | --- |
| `a!set-alarm <user> <time> <timezone>` | Set the bot kicks the user from the current call in guild (server) <br /><br />Args:<br /><ul><li>**user:** Mention of the user who is going to be disconnected from any call in guild.</li><li>**time:** The time when the bot will disconnect the user.</li><li>**timezone:** Timezone of the provided time.</li></ul> | `a!set-alarm @Yin 23:00 UTC-5` | Se desconectará a @Yin en 3 horas (7/17/2022, 7:00 AM).
| `a!remove-alarm` | Lists all the alarms set. The format includes index, user, and time. | `a!remove-alarm` | 0 para @Anvita a las 12/6/2021, 5:44 AM (UTC-5) <br />1 para @Yin a las 12/6/2021, 5:44 AM (UTC-5)
| `a!remove-alarm <index>` | Removes alarm with index provided. Indexes can be retrieved using the previous command.<br /> Since this command doesn't confirm the deletion, a listing should be done after removing an alarm. | `a!remove-alarm 0` | _No response_

## Installation and deploy
Before continuing, make sure you NodeJS 8+ installed

### Installing
Install the packages used in this bot using the following command
```
npm install
```

### Authenticating
Once you got your bot created in the <a href="https://discordapp.com/developers/applications/me" target=_blank>Discord's Developer Portal</a>, set the secret token as an enviormental variable with key `BOT_TOKEN`.

You can also install `dotenv` to set the enviormental variable.
```
npm install dotenv
```

Create a file named `.env` and set the following content:
```
BOT_TOKEN=yoUrBotTok3nHeRE
```

Or simply change the last line of `main.js`, and manually set the bot token (NOT RECOMMENDED).
```
client.login("yoUrBotTok3nHeRE");
```

Please do not forget to replace `yoUrBotTok3nHeRE` with your actual secret token.

### Running
Start the bot using the following command:

```
node main.js
```


## Q&A
* **Q. Why is it called "AlarmBot" if the bot does not perform the function of an alarm?** <br />
A. In the beginning, he bot was meant to wake up a call participant in a specified time using a sound, but it turned different at the end and the name was preserved.

* **Q. "Wake up a call participant"? So you assume users are asleep on a call?** <br />
A. Yes, in fact, this bot was specifically made so my ex and I could sleep on a call without worrying about our phones getting hot or our alarms not going off because of interference with the call.

* **Q. Will this bot disconnect an user if it's in a call in another server?**<br />
A. No, the bot can only disconnect the user if the alarm was set in the same guild as the call.

* **Q. Can anyone delete my "alarm"?**<br />
A. Yes, if the bot is in the guild.

* **Q. What if I get disconnected because of a bad connection, the time passes and Discord reconnects me after the time specified in my alarm?**<br />
A. You won't get disconnected from the call. There is no validation wether you're actually on a call or not.

* **Q. Are the alarms saved anywhere?**<br />
A. No, the alarms stay in memory as part of an array of objects and they are not saved outside the runtime. If the bot gets turned off, all of the alarms will be lost.

* **Q. Can the bot disconnect me from the call even if its not online?**<br />
A. The bot MUST be running in order to kick you from the call.

* **Q. Is the bot in Spanish language?**<br />
A. Yes.

## Contribute
I do not intend to continue with the development of this bot, but PRs are welcome.

You are free to use this code. But please do yourself a favor and improve the programming before making a bot out of it. Currently, it is very insecure unless you're planning to use it in only one guild/server, with people you trust that they won't remove your alarm(s).