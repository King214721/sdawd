const Discord = require("discord.js")
const chalk = require("chalk")

module.exports = {
    name: Discord.Events.ClientReady,
    once: false,

    /**
     * @param {Discord.Client} client 
     */

    async execute(client) {
        console.log(chalk.default.green(`${client.user.username} olarak giriş yapıldı.`))
    }
}
