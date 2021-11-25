const luxon = require("luxon");
const Discord = require('discord.js');
const {DateTime} = require("luxon");
const client = new Discord.Client(); // Creador del cliente de Discord.
const prefix = "a!"; // Prefijo

let usuariospending = {};
// { guild: #, user: #, timestamp: # }

setInterval(function () {
    usuariospending.forEach((el) => {
        if (el.timestamp > DateTime.now().toMillis()) {
            let guildId = el.guild;
            let memberId = el.user;

            client.guilds.fetch(guildId).then((guild) => {
                guild.members.fetch(memberId).then((member) => {
                    member.voice.kick();

                    client.users.fetch(memberId).then((user) => {
                        user.send('¡Hola! Te acabo de desconectar de la llamada en la que estabas n.n');
                    })
                })
            });
        }
    })
}, 25000);

client.on('message', message => {
    let args = message.content.substring(prefix.length).split(" ");

    if (message.content.startsWith(prefix + "set-alarm")) {
        if(args.length !== 4) {
            message.channel.send("Requieres de 4 argumentos para el buen uso de este comando.\nUso correcto: `a!setalarm @persona 6:00 UTC-5`");
        } else {
            let fecha = luxon.DateTime.fromFormat(args[2], 'H:ss', { zone: args[3], setZone: true }).toMillis();
            let cuantoFalta = luxon.DateTime.fromFormat(args[2], 'H:ss', { zone: args[3], setZone: true }).setLocale("es").toRelative();

            let rMember = message.guild.member(message.mentions.users.first()) || message.guild.member(args[1]);
            message.channel.send(`Se desconectará a <@!${rMember.id}> a la hora indicada en la zona indicada (${cuantoFalta}).`);
        }
    }
});

client.login(process.env.BOT_TOKEN);
