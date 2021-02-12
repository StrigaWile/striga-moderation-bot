const { MessageEmbed } = require('discord.js')
const data = require('quick.db')
const ayarlar = require('../ayarlar.json')
const inventory = require('../inventory/ServerConfig.json')
const jdb = new data.table("cezalar");
const kdb = new data.table("kullanici");
exports.run = async(client, message, args) => {
if(![inventory.ServerAuthorizedPerms.AbilityID, inventory.ServerAuthorizedPerms.BanSpearID].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(new MessageEmbed().setDescription(`${message.author} bu komutu kullanabilmek için <@&${inventory.ServerAuthorizedPerms.BanSpearID}> rolüne ihtiyacın var. ${inventory.Emoji.False}`).setAuthor(message.author.tag, message.author.avatarURL({dynamic:true})).setColor(inventory.Colors.NoEmbed)).then(x => x.delete({timeout: 6500}));
let BanLog = inventory.Channels.BanLogChannelID

if (args[0] && (args[0].includes('bilgi') || args[0].includes('info'))){
if(!args[1] || isNaN(args[1])) return message.channel.send(new MessageEmbed().setDescription(`${message.author}, Geçerli bir ban yemiş kullanıcı ID'si belirtmelisin. ${inventory.Emoji.False}`).setAuthor(message.author.tag, message.author.avatarURL({dynamic:true})).setColor(inventory.Colors.NoEmbed).setTimestamp()).then(x => x.delete({timeout: 6500}));
return message.guild.fetchBan(args.slice(1).join(' ')).then(({ user, reason }) => message.channel.send(new MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL({dynamic:true})).setColor(inventory.Colors.NoEmbed).setTimestamp().setDescription(`**Banlanan Üye:** ${user.tag} (\`${user.id}\`)\n**Ban Sebebi:** ${reason ? reason : "Belirtilmemiş!"}`))).catch(err => message.channel.send(new MessageEmbed().setAuthor(message.member.tag, message.author.avatarURL({ dynamic: true })).setColor(inventory.Colors.NoEmbed).setTimestamp().setDescription("Belirtilen ID numarasına sahip bir ban bulunamadı!")).then(x => x.delete({timeout: 5000})));
}


if (!args[0]) return 
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
let banatılma = `\`${atılmagün} ${atılmaay.replace(/01/, 'Ocak').replace(/02/, 'Şubat').replace(/03/, 'Mart').replace(/04/, 'Nisan').replace(/05/, 'Mayıs').replace(/06/, 'Haziran').replace(/07/, 'Temmuz').replace(/08/, 'Ağustos').replace(/09/, 'Eylül').replace(/10/, 'Ekim').replace(/11/, 'Kasım').replace(/12/, 'Aralık')} ${atılmasaat}\``
let banbitiş = `\`${bitişgün} ${bitişay.replace(/01/, 'Ocak').replace(/02/, 'Şubat').replace(/03/, 'Mart').replace(/04/, 'Nisan').replace(/05/, 'Mayıs').replace(/06/, 'Haziran').replace(/07/, 'Temmuz').replace(/08/, 'Ağustos').replace(/09/, 'Eylül').replace(/10/, 'Ekim').replace(/11/, 'Kasım').replace(/12/, 'Aralık')} ${bitişsaat}\``
moment.locale("tr")


let kullanici = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
let sebep = args.splice(1).join(" ")
if(!kullanici) return message.channel.send(new MessageEmbed().setDescription(`${message.author}, Bir kullanıcı etiketlemelisin. ${inventory.Emoji.False}`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor(inventory.Colors.NoEmbed).setTimestamp()).then(x => x.delete({timeout: 6500}));
if(!sebep) return message.channel.send(new MessageEmbed().setDescription(`${message.author}, Bir sebep belirtmelisin. ${inventory.Emoji.False}`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor(inventory.Colors.NoEmbed).setTimestamp()).then(x => x.delete({timeout: 6500}));
if(message.member.roles.highest.position <= kullanici.roles.highest.position) return message.channel.send(new MessageEmbed().setDescription(`${message.author}, Etiketlenen kullanıcı sizden üst/aynı pozisyondadır. ${inventory.Emoji.False}`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor(inventory.Colors.NoEmbed).setTimestamp()).then(x => x.delete({timeout: 6500}));
if(!kullanici.bannable)return message.channel.send(new MessageEmbed().setDescription(`${message.author}, Etiketlenen kullanıcı yasaklanamaz. ${inventory.Emoji.False}`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor(inventory.Colors.NoEmbed).setTimestamp()).then(x => x.delete({timeout: 6500}));
if(kullanici.id === message.author.id)return message.channel.send(new MessageEmbed().setDescription(`${message.author}, Kendini sunucudan yasaklayamazsın. ${inventory.Emoji.False}`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor(inventory.Colors.NoEmbed).setTimestamp()).then(x => x.delete({timeout: 6500}));
if(kullanici.id === client.user.id)return message.channel.send(new MessageEmbed().setDescription(`${message.author}, Bir botu sunucudan yasaklayamazsın. ${inventory.Emoji.False}`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor(inventory.Colors.NoEmbed).setTimestamp()).then(x => x.delete({timeout: 6500}));
if(kullanici.id === message.guild.OwnerID) return message.channel.send(new MessageEmbed().setDescription(`${message.author}, Sunucu sahibini sunucudan yasaklayamazsın. ${inventory.Emoji.False}`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor(inventory.Colors.NoEmbed).setTimestamp()).then(x => x.delete({timeout: 6500}));
kullanici.ban({reason: sebep})
let muteler = jdb.get(`ban`) || [];
if (!muteler.some(j => j.id == kullanici.id)) {
kdb.add(`kullanici.${message.author.id}.ban`, 1);
data.add('case', 1)
const numara = await data.fetch('case')
moment.locale("tr");
kdb.push(`kullanici.${kullanici.id}.sicil`, {Yetkili: message.author.id, Sebep: sebep, Ceza: "BAN", Süre: "Sınırsız", cezano: numara, Tarih: (`${moment(Date.now()).add(10,"hours").format("HH:mm:ss DD MMMM YYYY")}`)});};  

const doru = client.emojis.cache.get(inventory.Emoji.TrueID) 
message.react(doru)
client.channels.cache.get(BanLog).send(new MessageEmbed().setTitle(`Bir Üye Cezalandırıldı !`).setColor(inventory.Colors.Special).setFooter(message.author.tag, message.author.avatarURL({dynamic:true})).setTimestamp().setDescription(`Bir üye sunucudan yasaklandı, **${kullanici.user.tag}** adlı kullanıcı \`${sebep}\` sebebiyle sunucudan yasaklandı. ${inventory.Emoji.True}\n\nYetkili: ${message.author} (\`${message.author.id}\`)\nKullanıcı: ${kullanici.user} (\`${kullanici.user.id}\`)\nSebep: \`${sebep}\` \n Jail Atılma Saati: \`${banatılma}\` \n Tarih: \`${moment(Date.now()).add(10,"hours").format("HH:mm:ss DD MMMM YYYY")}\``));

}

exports.conf = {aliases: ["ban", "yasakla", "yargı"]}
exports.help = {name: "ban"}