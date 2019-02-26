const Discord = require('discord.js');
const Listing = require('./../module/Listing');


module.exports.run = async (bot, message, args) => {
    let snipeChannel = message.channel;
    const filter = m => !m.author.bot;
    let game = new Listing();

    let editLast3 = null;

    let startMessage = new Discord.RichEmbed()
        .setTitle("Please Vote In The Poll Below:")
        .setDescription("-:one: Solos\n-:two: Duos\n-:three: Squads")
        .setColor("#00ffff")
        .setFooter("Milks Bot");

    message.channel.send({embed: startMessage});
}

module.exports.help = {
    name: "poll"
}