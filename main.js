const luxon = require("luxon");
const Discord = require('discord.js');
const {DateTime} = require("luxon");
const client = new Discord.Client(); // Creador del cliente de Discord.
const prefix = "a!"; // Prefijo
const moment = require('moment');
moment().format();
moment.locale('es');

let usuariospending = [];
// { guild: #, user: #, timestamp: #, when: str, tz: str }

const quotes = ["Mira, toma este café :coffee: para iniciar el día ;)",
    "Días. Porque buenos serían si despertaras a mi lado",
    "Toma este hermoso cover para iniciar el día\nhttps://www.youtube.com/watch?v=MeCAo3SKqN0"
];

function randomQuote() {
    return quotes[Math.floor(Math.random() * quotes.length)];
}

client.on("ready", () => {
    client.user.setActivity('cómo duermes', { type: 'WATCHING' })
        .then(presence => {
            console.log(`Actividad puesta a ${presence.activities[0].name}`);
        }).catch(console.error);

    setInterval(function () {
        usuariospending.forEach((el, index, obj) => {
            if (el.timestamp < DateTime.now().toMillis()) {
                let guildId = el.guild;
                let memberId = el.user;

                client.guilds.fetch(guildId).then((guild) => {
                    guild.members.fetch(memberId).then((member) => {
                        member.voice.kick();

                        client.users.fetch(memberId).then((user) => {
                            user.send(`¡Hola! Te acabo de desconectar de una llamada en la que estabas porque pusiste una alarma el \`${el.when}\`. ¡Espero hayas dorimido bien, <@!${user.id}>!`);
                            setTimeout(() => {
                                user.send(randomQuote());
                            }, 2000);
                        })

                        obj.splice(index, 1);
                    })
                });
            }
        })
    }, 25000);
});

client.on('message', message => {
    let args = message.content.substring(prefix.length).split(" ");

    if (message.content.startsWith(prefix + "set-alarm")) {
        if(args.length !== 4) {
            message.channel.send("Requieres de 4 argumentos para el buen uso de este comando.\nUso correcto: `a!set-alarm @persona 14:00 UTC-5`");
        } else {
            let fecha = luxon.DateTime.fromFormat(args[2], 'H:mm', { zone: args[3], setZone: true }).toMillis();

            if (fecha < DateTime.now().toMillis()) {
                /* Si se coloca una fecha que ya pasó ese día, se coloca el siguiente día */
                fecha = DateTime.fromMillis(fecha).plus({ day: 1 }).toMillis();
            }

            // let cuantoFalta = luxon.DateTime.fromMillis(fecha).setLocale("es").toRelative();
            let cuantoFalta = moment(fecha).fromNow();

            let rMember = message.guild.member(message.mentions.users.first()) || message.guild.member(args[1]);

            let cuandoPusoLaAlarma = DateTime.now().setZone(args[3]).toLocaleString(DateTime.DATETIME_SHORT);
            let paraCuandoEsLaAlarma = DateTime.fromMillis(fecha).setZone(args[3]).toLocaleString(DateTime.DATETIME_SHORT);

            var json = {
                guild: message.guild.id,
                user: rMember.id,
                timestamp: fecha,
                when: cuandoPusoLaAlarma,
                tz: args[3]
            };

            usuariospending.push(json);

            // message.channel.send(`Se desconectará a <@!${rMember.id}> a la hora indicada en la zona indicada (${cuantoFalta} - ${fecha}).`);
            message.channel.send(`Se desconectará a <@!${rMember.id}> ${cuantoFalta} (\`${paraCuandoEsLaAlarma}\`).`);
        }
    }

    if (message.content.startsWith(prefix + "remove-alarm")) {
        if (!args[1]) {
            if (usuariospending.length !== 0) {
                let list = "";
                let ind = 0;
                usuariospending.forEach((el) => {
                    let memberId = el.user;
                    let alarmstr = DateTime.fromMillis(el.timestamp).setZone(el.tz).toLocaleString(DateTime.DATETIME_SHORT);

                    list += `${ind} para <@!${memberId}> a las \`${alarmstr} (${el.tz})\` \n`
                    ind++;
                });
                message.channel.send(list);
            } else {
                message.channel.send('No hay alarmas puestas.');
            }
        } else {
            let inde = isNaN(args[1]) ? 0 : args[1];
            usuariospending.splice(inde, 1);
        }
    }
});

client.login(process.env.BOT_TOKEN);