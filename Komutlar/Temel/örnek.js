const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const config = require("../../config");

module.exports = {
    kategori: `Kullanıcı`,
    bakım: false,
    data: new SlashCommandBuilder()
        .setName(`örnek`)
        .setDescription(`Örnek`)
        .setDMPermission(false),

    /**
     * 
     * @param {Discord.Client} client 
     * @param {Discord.ContextMenuCommandInteraction} interaction 
     */

    async execute(client, interaction) {

        interaction.reply({ content: `Örnek`, ephemeral: true });

    }
};