const { EmbedBuilder, Colors } = require("discord.js");
const config = require("../config");

const ERİŞİM_BULUNMUYOR = new EmbedBuilder()
  .setTitle(`${config.embed.hataTitle}`)
  .setColor(`${config.embed.hataColor}`)
  .setDescription(`Bu komutu kullanmak için gerekli yetkiniz bulunmuyor.`)
  .setFooter({ text: `${config.embed.footer}` })


module.exports = {
  ERİŞİM_BULUNMUYOR
};