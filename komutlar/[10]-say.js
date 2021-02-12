const { MessageEmbed } = require('discord.js')
const inventory = require('../inventory/ServerConfig.json')
exports.run = async(client, message) => { 
if(![inventory.ServerAuthorizedPerms.RegisterID, inventory.ServerAuthorizedPerms.AbilityID, inventory.ServerAuthorizedPerms.BanSpearID, inventory.ServerAuthorizedPerms.JailSpearID, inventory.ServerAuthorizedPerms.VoiceMuteSpearID, inventory.ServerAuthorizedPerms.MuteSpearID].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(new MessageEmbed().setDescription(`${message.author} bu komutu kullanabilmek için <@&${inventory.ServerAuthorizedPerms.RegisterID}> rolüne ihtiyacın var. ${inventory.Emoji.False}`).setAuthor(message.author.tag, message.author.avatarURL({dynamic:true})).setColor(inventory.Colors.NoEmbed)).then(x => x.delete({timeout: 6500}));

let guild = inventory.ServerSettings.GuildID
const voiceChannels = message.guild.channels.cache.filter(c => c.type === 'voice');
let count = 0;
for (const [id, voiceChannel] of voiceChannels) count += voiceChannel.members.size;
var msg = message;
var üyesayısı = msg.guild.members.cache.size.toString().replace(/ /g, "    ")
var üs = üyesayısı.match(/([0-9])/g)
üyesayısı = üyesayısı.replace(/([a-zA-Z])/g, "bilinmiyor").toLowerCase()
if(üs) {üyesayısı = üyesayısı.replace(/([0-9])/g, d => {return {'0': `<a:sifir:807990359975264317>`, '1': `<a:bir:807990287158083604>`, '2': `<a:iki:807990359954423840>`, '3': `<a:uc:807990359950491659>`, '4': `<a:dort:807990352945348628>`, '5': `<a:bes:807990340152852512>`, '6': `<a:alti:807990313749839904>`, '7': `<a:yedi:807990346343514182>`, '8': `<a:sekiz:807990360101617734>`, '9': `<a:dokuz:807990340321411102>`}[d];      })
}

var sessayı = count.toString().replace(/ /g, "    ")
var üs2 = sessayı.match(/([0-9])/g)
sessayı = sessayı.replace(/([a-zA-Z])/g, "bilinmiyor").toLowerCase()
if(üs2) {sessayı = sessayı.replace(/([0-9])/g, d => {return {'0': `<a:sifir:807990359975264317>`, '1': `<a:bir:807990287158083604>`, '2': `<a:iki:807990359954423840>`, '3': `<a:uc:807990359950491659>`, '4': `<a:dort:807990352945348628>`, '5': `<a:bes:807990340152852512>`, '6': `<a:alti:807990313749839904>`, '7': `<a:yedi:807990346343514182>`, '8': `<a:sekiz:807990360101617734>`, '9': `<a:dokuz:807990340321411102>`}[d];      })
}
var tagdakiler = 0;
let tag = "✰";
message.guild.members.cache.forEach(member => {if(member.user.username.includes(tag)) {tagdakiler = tagdakiler+1}})

var tagdakilerr = tagdakiler.toString().replace(/ /g, "    ")
var üs3 = tagdakilerr.match(/([0-9])/g)
tagdakilerr = tagdakilerr.replace(/([a-zA-Z])/g, "bilinmiyor").toLowerCase()
if(üs3) {tagdakilerr = tagdakilerr.replace(/([0-9])/g, d => {return {'0': `<a:sifir:807990359975264317>`, '1': `<a:bir:807990287158083604>`, '2': `<a:iki:807990359954423840>`, '3': `<a:uc:807990359950491659>`, '4': `<a:dort:807990352945348628>`, '5': `<a:bes:807990340152852512>`, '6': `<a:alti:807990313749839904>`, '7': `<a:yedi:807990346343514182>`, '8': `<a:sekiz:807990360101617734>`, '9': `<a:dokuz:807990340321411102>`}[d];      })
}

var onlayn = message.guild.members.cache.filter(m => m.presence.status !== "offline").size.toString().replace(/ /g, "    ")
var üs4= onlayn.match(/([0-9])/g)
onlayn = onlayn.replace(/([a-zA-Z])/g, "bilinmiyor").toLowerCase()
if(üs4) {onlayn = onlayn.replace(/([0-9])/g, d => {return {'0': `<a:sifir:807990359975264317>`, '1': `<a:bir:807990287158083604>`, '2': `<a:iki:807990359954423840>`, '3': `<a:uc:807990359950491659>`, '4': `<a:dort:807990352945348628>`, '5': `<a:bes:807990340152852512>`, '6': `<a:alti:807990313749839904>`, '7': `<a:yedi:807990346343514182>`, '8': `<a:sekiz:807990360101617734>`, '9': `<a:dokuz:807990340321411102>`}[d];      })
}
const doru = client.emojis.cache.get(inventory.Emoji.TrueID) 
message.react(doru)
const embed1 = new MessageEmbed()
.setColor(inventory.Colors.NoEmbed)
.setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
.setDescription(`
:white_small_square:  **Sunucuda Toplam** ${üyesayısı} **Üye bulunmakta.** 

:white_small_square:  **Sunucumuzun Sesli Kanalında ** ${sessayı} **Üye Sohbet Ediyor.**

:white_small_square:  **Toplam Bize Destek Veren ** ${tagdakilerr} **Üye Bulunmakta.**`)
.setFooter(`Komutu Kullanan Yetkili: ${message.author.username}`)

msg.channel.send(embed1);

}
exports.conf = {enabled: true, guildOnly: true, aliases: ["total",'toplam','say','info'], permLevel: 0};

exports.help = {name: 'say'}



