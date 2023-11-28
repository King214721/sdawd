const Discord = require("discord.js")
const FS = require("fs")
const config = require("./config")
const chalk = require("chalk")

const Client = new Discord.Client({
  intents: Object.values(Discord.GatewayIntentBits),
  partials: Object.values(Discord.Partials),
  presence: {
    activities: [
      {
        name: "Made by Spany",
        type: 0,
      },
    ],
    status: "dnd", // dnd = Rahatsız Etme, idle = Boşta, online = Çevrimiçi
  },
  shards: "auto",
});

module.exports = Client;

Client.slashCommands = new Discord.Collection();
Client.context = new Discord.Collection();
Client.menü = new Discord.Collection();
Client.events = 0;

const handlerFolder = FS
  .readdirSync("./Handler")
  .filter((file) => file.endsWith(".js"));
for (const file of handlerFolder) {
  require(`./Handler/${file}`)(Client);
}

Client.login(config.token)

process.on("unhandledRejection", (reason) => {
  console.log(reason);
  console.error(chalk.default.red(`[ERROR] ${reason}`));
});
process.on("uncaughtException", (err) => {
  console.error(chalk.default.red(`[ERROR] ${err}`));
});
process.on("uncaughtExceptionMonitor", (err) => {
  console.error(chalk.default.red(`[ERROR] ${err}`));
});