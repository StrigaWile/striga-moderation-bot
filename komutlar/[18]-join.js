const Discord = require('discord.js');
const inventory = require('../inventory/ServerConfig.json')
exports.run = async (client, message, args) => {    

if (isNaN(args[0])) return message.channel.send(new Discord.MessageEmbed().setDescription(`Bir sayı belirtmelisin. ${inventory.Emoji.False}`).setAuthor(message.author.tag, message.author.avatarURL({dynamic:true})).setColor(inventory.Colors.NoEmbed))


const members = message.guild.members.cache.filter(a => !a.user.bot).array().sort((b, a) => b.joinedTimestamp - a.joinedTimestamp) 


const qwxds = Number(args[0])
if (qwxds > members.length) {
return message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucuda ${members.length} üyeye sahip, lütfen sunucunun sayısından fazla rakam belirtmeyin.. ${inventory.Emoji.False}`).setAuthor(message.author.tag, message.author.avatarURL({dynamic:true})).setColor(inventory.Colors.NoEmbed))
}
if(qwxds < members.length)
//const plural = members.length !== 1
//return message.reply(`Sunucuda ${plural ? '' : ''} sadece ${members.length} üye ${plural ? 'var' : ''}!`)

message.channel.send(new Discord.MessageEmbed().setDescription("<@"+members[qwxds - 1].user.id+"> üyesi sunucunun "+args[0]+". üyesi."))
}


exports.conf = { enabled: true, guildOnly: false, aliases: ["join"], permLevel: 0};

exports.help = { name: 'join' };