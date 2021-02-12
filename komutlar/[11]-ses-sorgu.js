const { MessageEmbed } = require('discord.js')
const data = require('quick.db')
const ayarlar = require('../ayarlar.json')
const inventory = require('../inventory/ServerConfig.json')
const jdb = new data.table("cezalar");
const kdb = new data.table("kullanici");
exports.run = async(client, message, args) => {
if(![inventory.ServerAuthorizedPerms.RegisterID, inventory.ServerAuthorizedPerms.AbilityID].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(new MessageEmbed().setDescription(`${message.author} bu komutu kullanabilmek için <@&${inventory.ServerAuthorizedPerms.BanSpearID}> rolüne ihtiyacın var. ${inventory.Emoji.False}`).setAuthor(message.author.tag, message.author.avatarURL({dynamic:true})).setColor(inventory.Colors.NoEmbed)).then(x => x.delete({timeout: 6500}));
let strg;
let strg1 = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
let strg2 = message.guild.members.cache.get(args[0]);
if(!strg1) return message.channel.send(new MessageEmbed().setTimestamp().setColor('0x800d0d').setDescription(`Bir ID Girmelisin Veya Kullanıcı Etiketlemelisin`))
if (strg1) {strg = strg1;}
if (strg2) {strg = strg2;}
if (!strg) {strg = message.member;}
let ses = strg.voice.channel;
if (!ses) {message.channel.send(new MessageEmbed().setColor('0x800d0d').setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setDescription("**<@"+strg.id+"> Bir Sesli Kanalda Değil!**"));}
if (ses) {message.channel.send(new MessageEmbed().setColor('#7289D').setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setDescription("**<@"+strg.id+"> İsimli Kişi `"+ses.name+"` İsimli Kanalda!**"));}};

exports.conf = {enabled: true, guildOnly: true, aliases: ["sorgula"], permLevel: 0}
exports.help = {name: "kontrol"};
  
  