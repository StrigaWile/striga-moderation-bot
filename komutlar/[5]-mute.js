
const { MessageEmbed } = require("discord.js");
const data = require("quick.db");
const inventory = require('../inventory/ServerConfig.json')
const jdb = new data.table("cezalar");
const kdb = new data.table("kullanici");
const ms = require('ms');
const moment = require('moment');
module.exports.run = async (client, message, args) => {
if(![inventory.ServerAuthorizedPerms.AbilityID, inventory.ServerAuthorizedPerms.MuteSpearID].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(new MessageEmbed().setDescription(`${message.author} bu komutu kullanabilmek için <@&${inventory.ServerAuthorizedPerms.MuteSpearID}> rolüne ihtiyacın var. ${inventory.Emoji.False}`).setAuthor(message.author.tag, message.author.avatarURL({dynamic:true})).setColor(inventory.Colors.NoEmbed)).then(x => x.delete({timeout: 6500}));
let MuteLog = inventory.Channels.MuteLogChannelID

let timereplace = args[1];
let time = timereplace.replace(/y/, ' Yıl').replace(/d/, ' Gün').replace(/s/, ' Saniye').replace(/m/, ' Dakika').replace(/h/, ' Saat')
var tarih = new Date(Date.now())
var tarih2 = ms(timereplace)
var tarih3 = Date.now() + tarih2
let atılmaay = moment(Date.now()).format("MM")
let atılmagün = moment(Date.now()).format("DD")
let atılmasaat = moment(Date.now()).format("HH:mm:ss")
let bitişay = moment(tarih3).format("MM")
let bitişgün = moment(tarih3).format("DD")
let bitişsaat = moment(tarih3).format("HH:mm:ss")
let muteatılma = `\`${atılmagün} ${atılmaay.replace(/01/, 'Ocak').replace(/02/, 'Şubat').replace(/03/, 'Mart').replace(/04/, 'Nisan').replace(/05/, 'Mayıs').replace(/06/, 'Haziran').replace(/07/, 'Temmuz').replace(/08/, 'Ağustos').replace(/09/, 'Eylül').replace(/10/, 'Ekim').replace(/11/, 'Kasım').replace(/12/, 'Aralık')} ${atılmasaat}\``
let mutebitiş = `\`${bitişgün} ${bitişay.replace(/01/, 'Ocak').replace(/02/, 'Şubat').replace(/03/, 'Mart').replace(/04/, 'Nisan').replace(/05/, 'Mayıs').replace(/06/, 'Haziran').replace(/07/, 'Temmuz').replace(/08/, 'Ağustos').replace(/09/, 'Eylül').replace(/10/, 'Ekim').replace(/11/, 'Kasım').replace(/12/, 'Aralık')} ${bitişsaat}\``
moment.locale("tr")

let member = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
if (!member) return message.channel.send(new MessageEmbed().setColor(inventory.Colors.NoEmbed).setDescription(`${message.author}, lütfen bir kullanıcı etiketle !`).setAuthor(message.member.tag, message.author.avatarURL({dynamic: true}))).then(x => x.delete({timeout: 6500}));
          
let mute = message.mentions.members.first() || message.guild.members.cache.find(r => r.id === args[0]);
if (!mute) { new MessageEmbed().setColor(inventory.Colors.NoEmbed).setDescription(`${message.author}, lütfen mute atmam gereken kullanıcı belirt !`).setAuthor(message.member.tag, message.author.avatarURL({dynamic: true})).then(x => x.delete({timeout: 6500}));;
} else {
if (mute.roles.highest.position >= message.member.roles.highest.position) 
              {
return message.channel.send(new MessageEmbed().setColor(inventory.Colors.NoEmbed).setDescription(`Bu Kullanıcı Senden Üst/Aynı Pozisyonda.`).setAuthor(message.member.tag, message.author.avatarURL({dynamic: true}))).then(x => x.delete({timeout: 6500}));;
} else {
let zaman = args[1]   
.replace("sn", "s")
.replace("dk", "m")
.replace("sa", "h")
.replace("gün", "d");
if (!zaman) { message.channel.send(new MessageEmbed().setColor(inventory.Colors.NoEmbed).setDescription(`Lütfen Bir zaman dilimi belirtin.`).setAuthor(message.member.tag, message.author.avatarURL({dynamic: true}))).then(x => x.delete({timeout: 6500}));;
} else {
let sebep = args[2]
if(!sebep) return message.channel.send(new MessageEmbed().setColor(inventory.Colors.NoEmbed).setDescription(`Lütfen Bir sebep belirtiniz.`).setAuthor(message.member.tag, message.author.avatarURL({dynamic: true}))).then(x => x.delete({timeout: 6500}));  
                
let zamandilimi = zaman
.replace("m", " Dakika")
.replace("s", " Saniye")
.replace("h", " saat")
.replace("d", " Gün");
                  
let tumaylar = {
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
"12": "Aralık", 
}
let aylar = tumaylar; 
               {
let muteler = jdb.get(`tempmute`) || [];
if (!muteler.some(j => j.id == member.id)) {
kdb.add(`kullanici.${message.author.id}.mute`, 1);
data.add('case', 1)
const numara = await data.fetch('case')
moment.locale("tr");
kdb.push(`kullanici.${member.id}.sicil`, {
Yetkili: message.author.id,
Sebep: sebep,
Ceza: "MUTE",
Süre: zamandilimi,
cezano: numara,
Tarih: (`${moment(Date.now()).add(10,"hours").format("HH:mm:ss DD MMMM YYYY")}`) 
});
};
                 
data.set(`muteli_${member.guild.id + member.id}`, 'muteli')
data.set(`süre_${member.id + member.guild.id}`, zamandilimi)


const doru = client.emojis.cache.get(inventory.Emoji.TrueID) 
message.react(doru)
client.channels.cache.get(MuteLog).send(
new MessageEmbed()
.setTitle(`Bir Üye Metin Kanallarından Engellendi !`)
.setColor(inventory.Colors.Special)
.setFooter(message.author.tag, message.author.avatarURL({dynamic:true}))
.setTimestamp()
.setDescription(`
Bir üye metin kanallarında susturuldu, **${member.user.tag}** \`${sebep}\` sebebiyle \`${time}\` süresi boyunca metin kanallarından susturuldu. ${inventory.Emoji.True}

Yetkili: <@${message.author.id}> (\`${message.author.id}\`)
Kullanıcı: <@${member.id}> (\`${member.id}\`)
Süre: \`${time}\`
Sebep: \`${sebep}\`
Mute Atılma Saati: \`${muteatılma}\`
Mute Bitiş Saati: \`${mutebitiş}\`
Tarih: \`${moment(Date.now()).add(10,"hours").format("HH:mm:ss DD MMMM YYYY")}\``))
mute.roles.add(inventory.Penalties.MuteRole)
} 
setTimeout(async function() {
mute.roles.remove(inventory.Penalties.MuteRole)
client.channels.cache.get(MuteLog).send(
new MessageEmbed()
.setTitle(`Bir Üye Metin Kanallarından Susturulması Kalktı.`)
.setColor(inventory.Colors.Yesil)
.setFooter(message.author.tag, message.author.avatarURL({dynamic:true}))
.setTimestamp()
.setDescription(`
Bir üyenin metin kanallarından susturulması kalktı, **${member.user.tag}** adlı üyenin metin kanallarından susturulması kalktı. ${inventory.Emoji.True}

Yetkili: <@${message.author.id}> (\`${message.author.id}\`)
Kullanıcı: <@${member.id}> (\`${member.id}\`)
Süre: \`${time}\`
Mute Atılma Saati: \`${muteatılma}\`
Mute Bitiş Saati: \`${mutebitiş}\`
Tarih: \`${moment(Date.now()).format("DD")} ${aylar[moment(Date.now()).format("MM")]} ${moment(Date.now()).add(10,"hours").format("YYYY HH:mm:ss")}\``)
);
}, ms(zaman));
        
}}}
 
  
};
exports.conf = {enabled: true, guildOnly: true, aliases: ["mute"], permLevel: 0}
  
exports.help = {name: "mute"};
  
  