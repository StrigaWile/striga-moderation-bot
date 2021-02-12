
const { MessageEmbed } = require("discord.js");
const data = require("quick.db");
const inventory = require('../inventory/ServerConfig.json')
const jdb = new data.table("cezalar");
const kdb = new data.table("kullanici");
const ms = require('ms');
const moment = require('moment');
module.exports.run = async (client, message, args) => {
if(![inventory.ServerAuthorizedPerms.AbilityID, inventory.ServerAuthorizedPerms.VoiceMuteSpearID].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(new MessageEmbed().setDescription(`${message.author} bu komutu kullanabilmek için <@&${inventory.ServerAuthorizedPerms.VoiceMuteSpearID}> rolüne ihtiyacın var. ${inventory.Emoji.False}`).setAuthor(message.author.tag, message.author.avatarURL({dynamic:true})).setColor(inventory.Colors.NoEmbed)).then(x => x.delete({timeout: 6500}));
let VMuteLog = inventory.Channels.VoiceMuteLogChannelID 

let aylartoplam = {
"01": "Ocak",
"02": "Şubat",
"03": "Mart",
"04": "Nisan",
"05": "Mayıs",
"06": "Haziran",
"07": "Temmuz",
"08": "Ağustos",
"09": "Eylül",
"10": "Ekim",
"11": "Kasım",
"12": "Aralık"};
let aylar = aylartoplam;

let kullanici = message.mentions.members.first()  || message.guild.members.cache.get(args[0]);
if(!kullanici) return message.channel.send(new MessageEmbed().setDescription(`${message.author}, bir kullanıcı etiketle.`).setColor(inventory.Colors.NoEmbed).setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 6500}));
if(message.member.roles.highest.position <= kullanici.roles.highest.position) return message.channel.send(new MessageEmbed().setDescription(`${message.author}, Etiketlenen kullanıcı sizden üst/aynı pozisyondadır.`).setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true })).setColor(inventory.Colors.NoEmbed).setTimestamp()).then(x => x.delete({timeout: 6500}));
if(kullanici.id === message.author.id)return message.channel.send(new MessageEmbed().setDescription(`${message.author}, Kendini sunucudan mute atılamaz.`).setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true })).setColor(inventory.Colors.NoEmbed).setTimestamp()).then(x => x.delete({timeout: 6500}));
if(kullanici.id === client.user.id)return message.channel.send(new MessageEmbed().setDescription(`${message.author}, Bir botu sunucudan mute atılamaz.`).setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true })).setColor(inventory.Colors.NoEmbed).setTimestamp()).then(x => x.delete({timeout: 6500}));
if(kullanici.id === message.guild.OwnerID) return message.channel.send(new MessageEmbed().setDescription(`${message.author}, Sunucu sahibini sunucudan mute atılamaz.`).setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true })).setColor(inventory.Colors.NoEmbed).setTimestamp()).then(x => x.delete({timeout: 6500}));
let muteler = jdb.get(`voicemute`) || [];
let sebep = args.splice(1).join(" ");
if(!sebep) return message.channel.send(new MessageEmbed().setDescription(`${message.author}, Bir sebep belirtmelisin.`).setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true })).setColor(inventory.Colors.NoEmbed).setTimestamp()).then(x => x.delete({timeout: 6500}));

const doru = client.emojis.cache.get(inventory.Emoji.TrueID) 
message.react(doru)
client.channels.cache.get(VMuteLog).send(new MessageEmbed().setTitle(`Bir Üye Sesli Kanallarından Susturulması Kalktı.`).setColor(inventory.Colors.Yesil).setFooter(message.author.tag, message.author.avatarURL({dynamic:true})).setTimestamp().setDescription(`Bir üyenin sesli kanallardan yasağı sonlandırıldı, **${kullanici.user.tag}** sesli kanallardan yasağı bitirildi. ${inventory.Emoji.True} \n\n Yetkili: ${message.author} (\`${message.author.id}\`) \n Kullanıcı: ${kullanici.user} (\`${kullanici.user.id}\`) \nTarih: \`${moment(Date.now()).add(10,"hours").format("HH:mm:ss DD MMMM YYYY")}\``))
kullanici.voice.setMute(false);  

}
exports.conf = {enabled: true, guildOnly: true, aliases: ["vmute", "sesli-sustur-kaldır"], permLevel: 0,}

exports.help = {name: "unvmute"};
