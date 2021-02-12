const { MessageEmbed } = require('discord.js')
const data = require('quick.db')
const ayarlar = require('../ayarlar.json')
const inventory = require('../inventory/ServerConfig.json')
const moment = require('moment')
const ms = require('ms')
const jdb = new data.table("cezalar");
const kdb = new data.table("kullanici");
exports.run = async(client, message, args) => {
if(![inventory.ServerAuthorizedPerms.AbilityID, inventory.ServerAuthorizedPerms.JailSpearID].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(new MessageEmbed().setDescription(`${message.author} bu komutu kullanabilmek için <@&${inventory.ServerAuthorizedPerms.JailSpearID}> rolüne ihtiyacın var. ${inventory.Emoji.False}`).setAuthor(message.author.tag, message.author.avatarURL({dynamic:true})).setColor(inventory.Colors.NoEmbed)).then(x => x.delete({timeout: 6500}));
let JailLog = inventory.Channels.JailLogChannelID

if (!args[1]) return message.reply('Bir süre belirt. (\`1s, 1m, 1h, 1d, 1y\`)')
let timereplace = args[1];
let time = timereplace.replace(/y/, ' Yıl').replace(/d/, ' Gün').replace(/s/, ' Saniye').replace(/m/, ' Dakika').replace(/h/, ' Saat')
let reason;
var tarih = new Date(Date.now())
var tarih2 = ms(timereplace)
var tarih3 = Date.now() + tarih2
let atılmaay = moment(Date.now()).format("MM")
let atılmagün = moment(Date.now()).format("DD")
let atılmasaat = moment(Date.now()).format("HH:mm:ss")
let bitişay = moment(tarih3).format("MM")
let bitişgün = moment(tarih3).format("DD")
let bitişsaat = moment(tarih3).format("HH:mm:ss")
let jailatılma = `\`${atılmagün} ${atılmaay.replace(/01/, 'Ocak').replace(/02/, 'Şubat').replace(/03/, 'Mart').replace(/04/, 'Nisan').replace(/05/, 'Mayıs').replace(/06/, 'Haziran').replace(/07/, 'Temmuz').replace(/08/, 'Ağustos').replace(/09/, 'Eylül').replace(/10/, 'Ekim').replace(/11/, 'Kasım').replace(/12/, 'Aralık')} ${atılmasaat}\``
let jailbitiş = `\`${bitişgün} ${bitişay.replace(/01/, 'Ocak').replace(/02/, 'Şubat').replace(/03/, 'Mart').replace(/04/, 'Nisan').replace(/05/, 'Mayıs').replace(/06/, 'Haziran').replace(/07/, 'Temmuz').replace(/08/, 'Ağustos').replace(/09/, 'Eylül').replace(/10/, 'Ekim').replace(/11/, 'Kasım').replace(/12/, 'Aralık')} ${bitişsaat}\``
moment.locale("tr")

let kullanici = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
let zaman = args[1]
let sebep = args[2]
if(!kullanici) return message.channel.send(new MessageEmbed().setDescription(`${message.author}, Bir kullanıcı etiketlemelisin.`).setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()).then(x => x.delete({timeout: 5000}));
if(!args[1]) return message.channel.send(new MessageEmbed().setDescription(`${message.author}, Bir zaman belirtmelisin.`).setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()).then(x => x.delete({timeout: 5000}));
if(!sebep) return message.channel.send(new MessageEmbed().setDescription(`${message.author}, Bir sebep belirtmelisin.`).setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()).then(x => x.delete({timeout: 5000}));
if(message.member.roles.highest.position <= kullanici.roles.highest.position) return message.channel.send(new MessageEmbed().setDescription(`${message.author}, Etiketlenen kullanıcı sizden üst/aynı pozisyondadır.`).setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()).then(x => x.delete({timeout: 5000}));
if(kullanici.id === message.author.id)return message.channel.send(new MessageEmbed().setDescription(`${message.author}, Kendini sunucudan cezalıya atılamaz.`).setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()).then(x => x.delete({timeout: 5000}));
if(kullanici.id === client.user.id)return message.channel.send(new MessageEmbed().setDescription(`${message.author}, Bir botu sunucudan cezalıya atılamaz.`).setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()).then(x => x.delete({timeout: 5000}));
if(kullanici.id === message.guild.OwnerID) return message.channel.send(new MessageEmbed().setDescription(`${message.author}, Sunucu sahibini sunucudan cezalıya atılamaz.`).setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()).then(x => x.delete({timeout: 5000}));

let zaman1 = args[1]
.replace("sn", "s")
.replace("dk", "m")
.replace("sa", "h")
.replace("gün", "d");
//
var vakit = zaman1
.replace("m", " dakika")
.replace("s", " saniye")
.replace("h", " saat")
.replace("d", " d");  
  
data.set(`cezali_${message.guild.id + kullanici.id}`, 'cezali')
data.set(`süreJail_${message.mentions.users.first().id + message.guild.id}`, zaman1)
let muteler = jdb.get(`tempmute`) || [];
if (!muteler.some(j => j.id == kullanici.id)) {
kdb.add(`kullanici.${message.author.id}.jail`, 1);
data.add('case', 1)
const numara = await data.fetch('case')
moment.locale("tr");
kdb.push(`kullanici.${kullanici.id}.sicil`, {
Yetkili: message.author.id,
Sebep: sebep,
Ceza: "JAIL",
Süre: vakit,
cezano: numara,
Tarih: (`${moment(Date.now()).add(10,"hours").format("HH:mm:ss DD MMMM YYYY")}`)});};

const doru = client.emojis.cache.get(inventory.Emoji.TrueID) 
message.react(doru)
kullanici.roles.add(inventory.Penalties.JailRole);
kullanici.roles.cache.forEach(r => {
kullanici.roles.remove(r.id)
data.set(`${message.guild.id}.jail.${kullanici.id}.roles.${r.id}`, r.id )})
moment.locale("tr");
client.channels.cache.get(JailLog).send(new MessageEmbed().setTitle(`Bir Üye Cezalandırıldı !`).setColor(inventory.Colors.Special).setFooter(message.author.tag, message.author.avatarURL({dynamic:true})).setTimestamp().setDescription(`Bir üye cezalandırıldı, **${kullanici.user.tag}** \`${sebep}\` sebebiyle \`${time}\` boyunca metin kanalları ve sesli kanallardan yasaklandı. ${inventory.Emoji.True}\n\nYetkili: ${message.author} (\`${message.author.id}\`)\nKullanıcı: ${kullanici.user} (\`${kullanici.user.id}\`)\nSüre: \`${time}\` \nSebep: \`${sebep}\` \n Jail Atılma Saati: \`${jailatılma}\` \n Jail Bitiş Saati: \`${jailbitiş}\` \n Tarih: \`${moment(Date.now()).add(10,"hours").format("HH:mm:ss DD MMMM YYYY")}\``));
setTimeout(async () =>{
kullanici.roles.remove(inventory.Penalties.JailRole)
client.channels.cache.get(JailLog).send(new MessageEmbed().setTitle(`Bir Üyenin Cezası Bitti.`).setColor(inventory.Colors.Yesil).setFooter(message.author.tag, message.author.avatarURL({dynamic:true})).setTimestamp().setDescription(`Bir üyenin cezası sonlandı, **${kullanici.user.tag}** metin kanalları ve sesli kanallardan yasağı kaldırıldı. ${inventory.Emoji.True} \n\n Yetkili: ${message.author} (\`${message.author.id}\`) \n Kullanıcı: ${kullanici.user} (\`${kullanici.user.id}\`)\nSüre: \`${time}\` \n Jail Atılma Saati: \`${jailatılma}\` \n Jail Bitiş Saati: \`${jailbitiş}\` \nTarih: \`${moment(Date.now()).add(10,"hours").format("HH:mm:ss DD MMMM YYYY")}\``));
}, ms(zaman));
            setTimeout(async () =>{
message.guild.roles.cache.forEach(async r => {
const roller = await data.fetch(`${message.guild.id}.jail.${kullanici.id}.roles.${r.id}` )
if(roller != r.id)  return ;
if(roller){kullanici.roles.add(roller)}
data.delete(`${message.guild.id}.jail.${kullanici.id}.roles.${r.id}`)
})
              }, ms(zaman));


}

exports.conf = {aliases: ["cezalandır"], permLevel: 0} 
exports.help = {name: "jail"}