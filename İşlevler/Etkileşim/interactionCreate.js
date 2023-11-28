const Discord = require("discord.js")

module.exports = {
    name: Discord.Events.InteractionCreate,
    once: false,

    /**
     * @param {Discord.Client} client 
     * @param {Discord.Interaction} interaction 
     */

    async execute(interaction, client) {
        if (interaction.user.bot) return;
        if (!interaction.guild) return;
        if (interaction.isContextMenuCommand()) {
            const cmd = client.context.get(interaction.commandName)
            if (!cmd) {
                interaction.reply({
                    embeds: [
                        new Discord.EmbedBuilder()
                        .setTitle(`Hata`)
                        .setColor(`Red`)
                        .setDescription(`Beklenmeyen bir hata oluştu.`)
                    ], ephemeral: true
                })
            return
            }
            cmd.execute(client, interaction)
        }

        if (!interaction.isChatInputCommand()) return;
        const cmd = client.slashCommands.get(interaction.commandName)
        if (!cmd) {
            interaction.reply({
                embeds: [
                    new Discord.EmbedBuilder()
                    .setTitle(`Hata`)
                    .setColor(`Red`)
                    .setDescription(`Beklenmeyen bir hata oluştu.`)
                ], ephemeral: true
            })
        return
        }
        cmd.execute(client, interaction)
    }
}