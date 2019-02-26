const Discord = require('discord.js');
const Listing = require('./../module/Listing');


module.exports.run = async (bot, message, args) => {
    let snipeChannel = message.channel;
    const filter = m => !m.author.bot;
    let game = new Listing();

    let editLast3 = null;

    let startMessage = new Discord.RichEmbed()
        .setTitle("Squad Scrims Starting")
        .setDescription("Please Write The Last 3 From You're Server ID")
        .setColor("#ff0000")
        .setFooter("Milks Bot");

    message.channel.send({embed: startMessage});
    
    let time = 25;
    let editTime = "";

    let timeEmbed = new Discord.RichEmbed()
        .setTitle("Next Match In Approx...")
        .setDescription(time + " minutes")
        .setColor("#ff0000");

    setTimeout(async () => {
        editTime = await message.channel.send({embed: timeEmbed}).catch( (err) => {
            console.log("Cant Edit Deleted Message");
        });
    }, 10);
    
    let timeInterval = setInterval(() => {
        if (time === 1){
            time -= 1;
            timeEmbed.setDescription(time + " minutes");
            clearInterval(timeInterval);
        }else {
            time -= 1;
            timeEmbed.setDescription(time + " minutes");
        }

        editTime.edit({embed: timeEmbed}).catch((err) => {
            console.log("Cant Edit");
            clearInterval(timeInterval);
        });

    },60000)

    let last3 = new Discord.RichEmbed()
        .setTitle("Last 3 Of Server ID")
        .setColor("#ff0000");

        setTimeout(async () => {
            editLast3 = await message.channel.send({embed: last3});
            
            message.channel.overwritePermissions(message.guild.defaultRole, {
                SEND_MESSAGES: true
            }).catch((err) => {
                console.log(err);
            })
        }, 10);
    
    const collector = snipeChannel.createMessageCollector(filter, {max: 200, maxMatches : 200, time: 120000});

    collector.on('collect', m => {
        console.log(`Collected ${m.content} | ${m.author.username}`);

        if (game.data.length === 0 && m.content.length === 3){
            game.addID(m.content.toUpperCase(), m.author.username);
        }else if (m.content.length === 3){
            if (game.userPresent(m.author.username)){
                game.deleteUserEntry(m.author.username);
                if (game.idPresent(m.content.toUpperCase())){
                    game.addUser(m.content.toUpperCase(), m.author.username);
                }else {
                    game.addID(m.content.toUpperCase(), m.author.username);
                }
            } else {
               if (game.idPresent(m.content.toUpperCase())){
                   game.addUser(m.content.toUpperCase(), m.author.username);
               }else {
                   game.addID(m.content.toUpperCase(), m.author.username);
               }
            }
        }

        game.sort();

        let str = "";
        last3 = new Discord.RichEmbed()
            .setTitle("Last 3 Of Server ID")
            .setColor("#ff0000");

        for (var i = 0; i <game.data.length; i++){
            str = "";
            for (var j = 0; j < game.data[i].users.length ; j++){
                str += game.data[i].users[j] + "\n";
            }
            last3.addField(`${game.data[i].id.toUpperCase()} - ${game.data[i].users.length} PLAYERS`, str, true);
        }

        editLast3.edit({embed: last3}).catch((err) => {
            console.log("Caught eddit error");
        });

        if (m.deletable){
            m.delete().catch((err) => {
                console.log("Cant Delete");
                console.log(err);
            });
        }

    });

    collector.on('end', collected => {
        console.log(`Collected ${collected.size} items`);

        let endMessage = new Discord.RichEmbed()
        .setTitle("No more codes accepted at this point")
        .setDescription("Good luck and have fun in your game!")
        .setColor("#ff0000");

        message.channel.send({embed: endMessage});
        snipeChannel.overwritePermissions(
            message.guild.defaultRole,
            { "SEND_MESSAGES": false}
        )
    });
             

}



module.exports.help = {
    name: "squads"
}