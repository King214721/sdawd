const CommandArray = [];
const FS = require("fs");
const Discord = require("discord.js");
const config = require("../config");

/**
 * @param {Discord.Client} client
 */

module.exports = (client) => {
  FS.readdirSync("./Komutlar").forEach((dir) => {
    const commands = FS
      .readdirSync(`./Komutlar/${dir}/`)
      .filter((file) => file.endsWith(".js"));
    for (const file of commands) {
      const command = require(`../Komutlar/${dir}/${file}`);
      if (command.data) {
        if (command.bakım) continue;
        if (command.data.type && command.data.type !== Discord.ApplicationCommandType.ChatInput) {
          client.context.set(command.data.name, command);
          CommandArray.push(command.data);
        } else {
          client.slashCommands.set(command.data.name, command)
          CommandArray.push(command.data)
        }
      } else {
        continue;
      }
    }
  });

	client.on("ready", () => {
		if (config.bot.komutları_sil === false) {
			if (config.bot.global_komutlar === true) {
				client.application.commands.set(CommandArray);
			}
			else if (config.bot.global_komutlar === false) {
				client.guilds.cache
					.get(config.geliştirici_sunucu_id)
					?.commands.set(CommandArray);
			}
		}
		else if (config.bot.komutları_sil === true) {
			client.application.commands.set([]);
			client.guilds.cache.get(config.geliştirici_sunucu_id)?.commands.set([]);
		}
	});

};
