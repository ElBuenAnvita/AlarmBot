const luxon = require("luxon");
const Discord = require('discord.js');
const {DateTime} = require("luxon");
const client = new Discord.Client(); // Creador del cliente de Discord.
const prefix = "a!"; // Prefijo

let usuariospending = {};

/* setInterval(function () {
    usuariospending.forEach((el) => {

    })
}); */

client.on('message', message => {
    let args = message.content.substring(prefix.length).split(" ");

    if (message.content.startsWith(prefix + "set-alarm")) {
        if(args.length !== 4) {
            message.channel.send("Requieres de 4 argumentos para el buen uso de este comando.\nUso correcto: `a!setalarm @persona 6:00 GMT-5`");
        } else {
            let fecha = luxon.DateTime.fromFormat(args[2], 'H:ss', { zone: args[3], setZone: true }).toMillis();
            let cuantoFalta = DateTime.now().plus({ milliseconds: fecha }).setLocale("es").toRelative();
            message.channel.send(`Se desconectará a <@!${args[1]}> a la hora indicada en la zona indicada (${cuantoFalta}).`);
        }
    }
});

client.login(process.env.BOT_TOKEN);
