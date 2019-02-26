const Discord = require('discord.js');
const Listing = require('./../module/Listing');


module.exports.run = async (bot, message, args) => {
    let snipeChannel = message.channel;
    const filter = m => !m.author.bot;
    let game = new Listing();

    let editLast3 = null;

    let startMessage = new Discord.RichEmbed()
        .setTitle("Milks Bot Commands")
        .setDescription("!1m = Scrims starting in 1 minute\n!2m = Scrims starting in 2 minutes\n!now = scrims starting now\n!post = a message to post last 3 codes to all\n!solos,!duos,!squads = last 3 codes to appear\n!poll = a poll to vote for which game mode of scrims")
        .setColor("#00ffff")
        .setFooter("Milks Bot");

    message.channel.send({embed: startMessage});
}

module.exports.help = {
    name: "help"
}