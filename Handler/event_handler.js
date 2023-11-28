const fs = require("fs");
const Discord = require("discord.js")

/**
 * @param {Discord.Client} client
 */

module.exports = (client) => {

  fs.readdirSync("./İşlevler/").forEach((dir) => {
    const events = fs
      .readdirSync(`./İşlevler/${dir}/`)
      .filter((f) => f.endsWith(".js"));
    for (const file of events) {
      const event = require(`../İşlevler/${dir}/${file}`);

      client.events++;

      if (event.once) {
        client.once(event.name, (...args) => event.execute(...args, client));
      } else {
        client.on(event.name, (...args) => event.execute(...args, client));
      }
    }
  });
};
