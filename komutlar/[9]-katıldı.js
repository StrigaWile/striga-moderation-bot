const { MessageEmbed } = require('discord.js')
const data = require('quick.db')
const ayarlar = require('../ayarlar.json')
const inventory = require('../inventory/ServerConfig.json')
exports.run = async (client, message, args) => {
if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(new MessageEmbed().setDescription(`${message.author} bu komutu kullanabilmek için **Yönetici** iznine ihtiyacın var. ${inventory.Emoji.False}`).setAuthor(message.author.tag, message.author.avatarURL({dynamic:true})).setColor(inventory.Colors.NoEmbed)).then(x => x.delete({timeout: 6500}));
let members = message.guild.members.cache.filter(member => member.roles.cache.has(inventory.ServerSettings.KatildiRol) && member.voice.channelID != inventory.ServerSettings.ToplantiKanal);
members.array().forEach((member, index) => {setTimeout(() => {member.roles.remove(inventory.ServerSettings.KatildiRol).catch();}, index * 1250)});
let verildi = message.member.voice.channel.members.filter(member => !member.roles.cache.has(inventory.ServerSettings.KatildiRol) && !member.user.bot)
verildi.array().forEach((member, index) => {setTimeout(() => {member.roles.add(inventory.ServerSettings.KatildiRol).catch();}, index * 1250)});
message.channel.send(new MessageEmbed().setDescription(`<@&${inventory.ServerSettings.KatildiRol}> Rolü <#${inventory.ServerSettings.ToplantiKanal}> Kanalında Bulunan Üyelere Dağıtılmaya Başladı.\n\n ${inventory.Emoji.True} Toplam Rol Verilen Kullanıcı: \n \`${verildi.size}\` \n\n ${inventory.Emoji.False} Rolleri Geri Alınan Kullanıcı Sayısı: \n \`${members.size}\``).setColor(inventory.Colors.Magenta).setTitle(`Toplantı Yoklaması Alındı.`).setThumbnail(message.guild.iconURL({dynamic:true})))}
exports.conf = {enabled: true, guildOnly: true, aliases: ["toplantı", "toplantı-kontrol", "yoklama"], permLevel: 0,}
exports.help = {name: "toplantıkontrol"}
