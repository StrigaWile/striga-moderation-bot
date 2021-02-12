const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const config = require('./ayarlar.json');
const chalk = require('chalk');
const moment = require('moment');
var Jimp = require('jimp');
const { Client, Util } = require('discord.js');
const fs = require('fs');
const db = require('quick.db');
const express = require('express');
require('./util/eventLoader.js')(client);
const path = require('path');
const snekfetch = require('snekfetch');
const inventory = require('./inventory/ServerConfig.json')
const ms = require('ms');
const { waitForDebugger } = require('inspector');
var prefix = ayarlar.prefix;

const log = message => {console.log(`${message}`);};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
if (err) console.error(err);
log(`Toplam ${files.length} Destekçi Ve Komut Yükleniyor...`);
files.forEach(f => {
let props = require(`./komutlar/${f}`);
log(`BOT | ${props.help.name} Komutu Yüklendi.`);
client.commands.set(props.help.name, props);
props.conf.aliases.forEach(alias => {client.aliases.set(alias, props.help.name);});});});

client.reload = command => {return new Promise((resolve, reject) => {try {delete require.cache[require.resolve(`./komutlar/${command}`)];
let cmd = require(`./komutlar/${command}`);
client.commands.delete(command);
client.aliases.forEach((cmd, alias) => {if (cmd === command) client.aliases.delete(alias);});
client.commands.set(command, cmd);
cmd.conf.aliases.forEach(alias => {client.aliases.set(alias, cmd.help.name);});resolve();} catch (e) {reject(e);}});};

client.load = command => {return new Promise((resolve, reject) => {try {let cmd = require(`./komutlar/${command}`);
client.commands.set(command, cmd);
cmd.conf.aliases.forEach(alias => {client.aliases.set(alias, cmd.help.name);});resolve();} catch (e) {reject(e);}});};

client.unload = command => { return new Promise((resolve, reject) => { try {delete require.cache[require.resolve(`./komutlar/${command}`)];
let cmd = require(`./komutlar/${command}`);
client.commands.delete(command);
client.aliases.forEach((cmd, alias) => {if (cmd === command) client.aliases.delete(alias);});resolve();} catch (e) {reject(e);}});};

client.on("ready", async () => {
let botVoiceChannel = client.channels.cache.get(ayarlar.botVoiceChannelID);
if (botVoiceChannel) botVoiceChannel.join().catch(err => console.error("Bot ses kanalına bağlanamadı!"));});
  
client.elevation = message => {
if (!message.guild) {return;}
let permlvl = 0;
if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
if (message.author.id === ayarlar.sahip) permlvl = 4; return permlvl;};
var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
client.on('warn', e => {console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));});
client.on('error', e => {console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));});
client.login(ayarlar.token);


client.on("message", message => {
    if(message.content.toLowerCase() == "!tag") 
    return message.channel.send(`${inventory.ServerSettings.ServerTag}`)
});

client.on("message", message => {
    if(message.content.toLowerCase() == "-tag") 
    return message.channel.send(`${inventory.ServerSettings.ServerTag}`)
});

client.on("message", message => {
    if(message.content.toLowerCase() == "u!tag") 
    return message.channel.send(`${inventory.ServerSettings.ServerTag}`)
});

client.on("message", message => {
    if(message.content.toLowerCase() == "u.tag") 
    return message.channel.send(`${inventory.ServerSettings.ServerTag}`)
});

client.on("message", message => {
    if(message.content.toLowerCase() == "u-tag") 
    return message.channel.send(`${inventory.ServerSettings.ServerTag}`)
});

client.on("message", message => {
    if(message.content.toLowerCase() == ".tag") 
    return message.channel.send(`${inventory.ServerSettings.ServerTag}`)
});

client.on("message", message => {
    if(message.content.toLowerCase() == "t!tag") 
    return message.channel.send(`${inventory.ServerSettings.ServerTag}`)
});

client.on("message", message => {
    if(message.content.toLowerCase() == "tag") 
    return message.channel.send(`${inventory.ServerSettings.ServerTag}`)
});

client.on("message" , async msg => {
  
    if(!msg.guild) return;
    if(msg.content.startsWith(ayarlar.prefix+"afk")) return; 
    
    let afk = msg.mentions.users.first()
    
    const kisi = db.fetch(`afkid_${msg.author.id}_${msg.guild.id}`)
    
    const isim = db.fetch(`afkAd_${msg.author.id}_${msg.guild.id}`)
   if(afk){
     const sebep = db.fetch(`afkSebep_${afk.id}_${msg.guild.id}`)
     const kisi3 = db.fetch(`afkid_${afk.id}_${msg.guild.id}`)
     if(msg.content.includes(kisi3)){
  
         msg.channel.send(new Discord.MessageEmbed().setColor('BLACK').setDescription(`<@` + msg.author.id + `> Etiketlediğiniz Kişi Afk \nSebep : ${sebep}`))
     }
   }
    if(msg.author.id === kisi){
  
         msg.channel.send(new Discord.MessageEmbed().setColor('BLACK').setDescription(`<@${kisi}> Başarıyla Afk Modundan Çıktınız`))
     db.delete(`afkSebep_${msg.author.id}_${msg.guild.id}`)
     db.delete(`afkid_${msg.author.id}_${msg.guild.id}`)
     db.delete(`afkAd_${msg.author.id}_${msg.guild.id}`)
      msg.member.setNickname(isim)
      
    }
    
  });
  
  

  
  client.on('guildMemberAdd', async(member) => {
  let mute = member.guild.roles.cache.find(r => r.name === "Muted");
  let mutelimi = db.fetch(`muteli_${member.guild.id + member.id}`)
  let süre = db.fetch(`süre_${member.id + member.guild.id}`)
  if (!mutelimi) return;
  if (mutelimi == "muteli") {
  member.roles.add(inventory.Penalties.MuteRole);
   
  member.send("Muteliyken Sunucudan Çıktığın için Yeniden Mutelendin!")
   setTimeout(function(){
  db.delete(`muteli_${member.guild.id + member.id}`)
      member.send(`<@${member.id}> Muten açıldı.`)
      member.roles.remove(inventory.Penalties.MuteRole);
    }, ms(süre));
  }
  })
  

  
  
  client.on('guildMemberAdd', async member => {
  const data = require('quick.db')
  const asd = data.fetch(`${member.guild.id}.jail.${member.id}`)
  if(asd) {
  let data2 = await data.fetch(`jailrol_${member.guild.id}`)
  let rol = member.guild.roles.cache.get(data2)
  if(!rol) return;
  let kişi = member.guild.members.cache.get(member.id)
  kişi.roles.add(rol.id);
  kişi.roles.cache.forEach(r => {
  kişi.roles.remove(r.id)
  data.set(`${member.guild.id}.jail.${kişi.id}.roles.${r.id}`, r.id )})
      data.set(`${member.guild.id}.jail.${kişi.id}`)
    const wasted = new Discord.MessageEmbed()
    .setAuthor(member.user.tag, member.user.avatarURL({ dynamic : true }))
    .setColor(`#0x800d0d`)
    .setDescription(`Dostum hadi ama !!! Jaildan Kaçamazsın ikimizde birbirimizi kandırmayalım...!`)
    .setTimestamp()
      member.send(wasted)
  } 
    
    
  })



