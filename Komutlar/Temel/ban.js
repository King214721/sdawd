const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js");
const config = require("../../config");

module.exports = {
    data: new SlashCommandBuilder()
        .setName(`yasakla`)
        .setDescription(`Belirtilen kullanıcıyı sunucudan yasaklar.`)
        .addUserOption(option =>
            option
                .setName('kullanıcı')
                .setDescription('Yasaklanacak kullanıcıyı belirtin.')
                .setRequired(true))
        .addStringOption(option =>
            option
                .setName('sebep')
                .setDescription('Yasaklama sebebini belirtin.')
                .setRequired(false))
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),

    /**
     * 
     * @param {Discord.Client} client 
     * @param {Discord.ContextMenuCommandInteraction} interaction 
     */

    async execute(client, interaction) {

        const user = interaction.options.getUser('kullanıcı');
        const reason = interaction.options.getString('sebep') || `Sebep belirtilmedi.`;
        const member = interaction.guild.members.cache.get(user.id);

        if (member.id === interaction.user.id) return interaction.reply({ content: `❌ Kendini yasaklayamazsın!`, ephemeral: true });
        if (member.id === client.user.id) return interaction.reply({ content: `❌ Botu (${client.user.username}) yasaklayamazsın!`, ephemeral: true });
        if (!member.bannable) return interaction.reply({ content: `❌ Bu kullanıcıyı sunucudan yasaklayamam!`, ephemeral: true });

        try {

            member.ban({ reason: `"${reason}" sebebi ile sunucudan yasaklandı. Yasaklayan: ${interaction.user.tag} (${interaction.user.id})` });
            await interaction.reply({ content: `✅ ${member} kullanıcısı \`${reason}\` sebebi ile sunucudan yasaklandı!` });

        } catch (e) {
            interaction.reply({ content: `❌ Bir hata oluştu! Hata: \`${e}\`` })
        }

    }
};