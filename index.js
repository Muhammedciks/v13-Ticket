const Discord = require("discord.js");//rootusertarafındankodlanmıştır
const client = new Discord.Client({
  disableMentions: 'everyone'
})
require("dotenv").config()
require('discord-reply');//rootusertarafındankodlanmıştır
const { Database } = require("quickmongo");//rootusertarafındankodlanmıştır
const db = new Database(process.env.Mongo)
const randomstring = require("randomstring");//rootusertarafındankodlanmıştır
const disbut = require('discord-buttons');//rootusertarafındankodlanmıştır
require('discord-buttons')(client);//rootusertarafındankodlanmıştır
const { MessageMenu, MessageMenuOption } = require('discord-buttons');//rootusertarafındankodlanmıştır
const config = require(`./config.json`)
const prefix = config.prefix;//rootusertarafındankodlanmıştır
//rootusertarafındankodlanmıştır
async function channelLog(embed) {//rootusertarafındankodlanmıştır
  if (!config.log_channel_id) return;//rootusertarafındankodlanmıştır
  let ch = await client.channels.cache.get(config.log_channel_id) || message.guild.channels.cache.find(channel => channel.name.match("log"));//rootusertarafındankodlanmıştır
  if (!ch) return console.log(`lan salak configi doldur`)//rootusertarafındankodlanmıştır
  ch.send(embed)//rootusertarafındankodlanmıştır
}//rootusertarafındankodlanmıştır
//rootusertarafındankodlanmıştır
client.on('ready', async () => {//rootusertarafındankodlanmıştır
  await console.clear()//rootusertarafındankodlanmıştır
  channelLog(`> **Bot** discord API'sine bağlanıyor`)//rootusertarafındankodlanmıştır
  console.log(`TÜM HAKLAR ROOTUSER'E AİTTİR`)//rootusertarafındankodlanmıştır
  console.log(`TÜM HAKLAR ROOTUSER'E AİTTİR`)//rootusertarafındankodlanmıştır
  console.log(`ROOTUSER TARAFINDAN KODLANMIŞTIR`)//rootusertarafındankodlanmıştır
  console.log(`TÜM HAKLAR ROOTUSER'E AİTTİR`)//rootusertarafındankodlanmıştır
  console.log(`TÜM HAKLAR ROOTUSER'E AİTTİR`)//rootusertarafındankodlanmıştır
  console.log(`ROOTUSER TARAFINDAN KODLANMIŞTIR`)//rootusertarafındankodlanmıştır
  console.log(`TÜM HAKLAR ROOTUSER'E AİTTİR`)
  console.log(`TÜM HAKLAR ROOTUSER'E AİTTİR`)
  console.log(`ROOTUSER TARAFINDAN KODLANMIŞTIR`)
  console.log(`TÜM HAKLAR ROOTUSER'E AİTTİR`)
  console.log(`TÜM HAKLAR ROOTUSER'E AİTTİR`)
  console.log(`ROOTUSER TARAFINDAN KODLANMIŞTIR`)
  client.user.setActivity(config.status.name, { type: config.status.type.toUpperCase(), url: "https://twitch.tv/rootpeek" })
});//rootusertarafındankodlanmıştır
client.on("message", async(message) =>{
  if (message.author.bot || !message.guild) return;
  let args = message.content.toLowerCase().split(" ");//rootusertarafındankodlanmıştır
  let command = args.shift()
  if (command == prefix + `yardım`) {
    let embed = new Discord.MessageEmbed()
      .setTitle(`Komut Listesi`)
      .setDescription(`> \`${prefix}ticket-gönder\` - Ticketleri açmak için bir mesaj gönderin
> \`${prefix}ticket-ekle\` - Belirli bir tickete üye ekler
> \`${prefix}ticket-kaldır\` - Bir üyeyi belirli bir ticket kaldırır.
> \`${prefix}ticket-sil\` - Belirli bir ticketi sil
> \`${prefix}ticket-kapat\` - Belirli bir ticketi kapat
> \`${prefix}ticket-aç\` - Belirli bir ticketi aç
> \`${prefix}yeniden-adlandır\` - Belirli bir ticketi yeniden adlandır
> \`${prefix}kanal-ayarla\` - ticketin gideceği kanalı ayarlayın
> \`${prefix}yetkili-ayarla\` - ticket yetkililerini ayarlayın`)
      .setTimestamp()
      .setColor(0x5865F2)
      .setFooter(`MuhammedinKs`)
    message.lineReply({ embed: embed })
  }
  if (command == prefix + `ticket-ekle`) {
    if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.lineReply(`:x: Bu komut gerektirir \`MANAGE_MESSAGES\` izini gerekir..`);//rootusertarafındankodlanmıştır
    let args = message.content.split(' ').slice(1).join(' ');//rootusertarafındankodlanmıştır
    let channel = message.mentions.channels.first() || message.channel;
    const sfats = await db.get(`Staff_${message.guild.id}`)
    if (!sfats) return message.lineReply({ embed: { description: `bu sunucunun önce yetkili rollerini ayarlaması gerekiyor! \`{prefix}yetkili-ayarla\``, color: 0x5865F2 } })
    if (await db.get(`ticket_${channel.id}_${message.guild.id}`)) {
      let member = message.mentions.members.first() || message.guild.members.cache.get(args || message.guild.members.cache.find(x => x.user.username === args || x.user.username === args));//rootusertarafındankodlanmıştır
      if (!member) return message.lineReply(`İD'nin bir üyesinden bahsedin`);//rootusertarafındankodlanmıştır
      try {
        channel.updateOverwrite(member.user, {
          VIEW_CHANNEL: true,
          SEND_MESSAGES: true,
          ATTACH_FILES: true,
          READ_MESSAGE_HISTORY: true,
        }).then(() => {
          message.lineReply({ embed: { description: `${member} başarıyla eklendi ${channel}`, color: 0x5865F2 } });//rootusertarafındankodlanmıştır
          let log_embed = new Discord.MessageEmbed()
            .setTitle(`A person has been added to ticket`)
            .addField(`Ticket`, `<#${channel.id}>`)
            .addField(`Eklenen Kişi`, member.user)
            .addField(`Eyleme  göre`, `<@!${message.author.id}>`)
            .setTimestamp()
            .setColor(`GREEN`)
            .setFooter(message.guild.name, message.guild.iconURL())
          channelLog(log_embed)
        });//rootusertarafındankodlanmıştır
      }
      catch (e) {
        return message.channel.send(`Bir hata oluştu. Lütfen tekrar deneyin!`);//rootusertarafındankodlanmıştır
      }
    }
  }
  if (command == prefix + `ticket-kaldır`) {
    if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.lineReply(`:x: Bu komut gerektirir \`MANAGE_MESSAGES\` izini gerekir..`);//rootusertarafındankodlanmıştır
    let args = message.content.split(' ').slice(1).join(' ');//rootusertarafındankodlanmıştır
    let channel = message.mentions.channels.first() || message.channel;
    const sfats = await db.get(`Staff_${message.guild.id}`)
    if (!sfats) return message.lineReply({ embed: { description: `bu sunucunun önce yetkili rollerini ayarlaması gerekiyor! \`{prefix}yetkili-ayarla\``, color: 0x5865F2 } })
    if (await db.get(`ticket_${channel.id}_${message.guild.id}`)) {
      let member = message.mentions.members.first() || message.guild.members.cache.get(args || message.guild.members.cache.find(x => x.user.username === args || x.user.username === args));//rootusertarafındankodlanmıştır
      if (!member) return message.lineReply(`İD'nin bir üyesinden bahsedin`);//rootusertarafındankodlanmıştır
      try {
        channel.updateOverwrite(member.user, {
          VIEW_CHANNEL: false,
        }).then(() => {
           let log_embed = new Discord.MessageEmbed()
            .setTitle(`Kişiler tickete kaldırıldı`)
            .addField(`Ticket`, `<#${channel.id}>`)
            .addField(`Kişi eklendi`, member.user)
            .addField(`Eyleme  göre`, `<@!${message.author.id}>`)
            .setTimestamp()
            .setColor(`RED`)
            .setFooter(message.guild.name, message.guild.iconURL())
          channelLog(log_embed)
          message.lineReply({ embed: { description: `Başarıyla silindi ${member} tarafından ${channel}`, color: 0x5865F2 } });//rootusertarafındankodlanmıştır
        });//rootusertarafındankodlanmıştır
      }
      catch (e) {
        return message.channel.send(`Bir hata oluştu. Lütfen tekrar deneyin!`);//rootusertarafındankodlanmıştır
      }
    }
  }
  if (command == prefix + 'ticket-sil') {
    if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.lineReply(`:x: Bu komut gerektirir \`MANAGE_MESSAGES\` izini gerekir..`);//rootusertarafındankodlanmıştır
    let channel = message.mentions.channels.first() || message.channel;
    const sfats = await db.get(`Staff_${message.guild.id}`)
    if (!sfats) return message.lineReply({ embed: { description: `bu sunucunun önce yetkili rollerini ayarlaması gerekiyor! \`{prefix}yetkili-ayarla\``, color: 0x5865F2 } })
    if (await db.get(`ticket_${channel.id}_${message.guild.id}`)) {
      message.lineReply({ embed: { description: `Ticketiniz 5 saniye sonra gerçekleştirilir, ve kapatılacak`, color: 0x5865F2 } })
      setTimeout(async () => {
        let log_embed = new Discord.MessageEmbed()
            .setTitle(`Ticket Deleted`)
            .addField(`Ticket Numarası`, `${await db.get(`ticket_${channel.id}_${message.guild.id}`).count}`)
            .addField(`Ticketi açan`,`<@!${await db.get(`ticket_${channel.id}_${message.guild.id}`).ticket_by}>`)
            .addField(`Eyleme  göre`, `<@!${message.author.id}>`)
            .setTimestamp()
            .setColor(`RED`)
            .setFooter(message.guild.name, message.guild.iconURL())
          channelLog(log_embed)
          channel.delete()
      }, 5000)
    }
  }
  if (command == prefix + 'ticket-kapat') {
    if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.lineReply(`:x: Bu komut gerektirir \`MANAGE_MESSAGES\` izini gerekir..`);//rootusertarafındankodlanmıştır
    let channel = message.mentions.channels.first() || message.channel;
    const sfats = await db.get(`Staff_${message.guild.id}`)
    if (!sfats) return message.lineReply({ embed: { description: `bu sunucunun önce yetkili rollerini ayarlaması gerekiyor! \`{prefix}yetkili-ayarla\``, color: 0x5865F2 } })
    if (await db.get(`ticket_${channel.id}_${message.guild.id}`)) {
      let msg = await message.lineReply({ embed: { description: `Ticketiniz 5 saniye sonra gerçekleştirilir, ve kapatılacak`, color: 0x5865F2 } })
      setTimeout(async () => {
        try {
          msg.delete()
          channel.send({ embed: { description: `Ticket tarafından kapatıldı <@!${message.author.id}>`, color: `YELLOW` } })
          let type = 'member'
          await Promise.all(channel.permissionOverwrites.filter(o => o.type === type).map(o => o.delete()));//rootusertarafındankodlanmıştır
          channel.setName(`closed-${(await db.get(`ticket_${channel.id}_${message.guild.id}`))}`)
          let log_embed = new Discord.MessageEmbed()
            .setTitle(`Ticket closed`)
            .addField(`Ticket`, `<#${channel.id}>`)
            .addField(`Eyleme  göre`, `<@!${message.author.id}>`)
            .setTimestamp()
            .setColor(`YELLOW`)
            .setFooter(message.guild.name, message.guild.iconURL())
          channelLog(log_embed)
        } catch (e) {
          return message.channel.send(`Bir hata oluştu. Lütfen tekrar deneyin!`);//rootusertarafındankodlanmıştır
        }
      }, 1000)
    }
  }

  if (command == prefix + 'ticket-aç') {
    if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.lineReply(`:x: Bu komut gerektirir \`MANAGE_MESSAGES\` izini gerekir..`);//rootusertarafındankodlanmıştır
    let channel = message.mentions.channels.first() || message.channel;
    const sfats = await db.get(`Staff_${message.guild.id}`)
    if (!sfats) return message.lineReply({ embed: { description: `bu sunucunun önce yetkili rollerini ayarlaması gerekiyor! \`{prefix}yetkili-ayarla\``, color: 0x5865F2 } })
    if (await db.get(`ticket_${channel.id}_${message.guild.id}`)) {
      let msg = await message.lineReply({ embed: { description: `Ticketiniz 5 saniye sonra gerçekleştirilir`, color: 0x5865F2 } })
      setTimeout(async () => {
        try {
          msg.delete()
          channel.send({ embed: { description: `Ticket tarafından açıldı <@!${message.author.id}>`, color: `GREEN` } })
          let meember = client.users.cache.get(await db.get(`ticket_${channel.id}_${message.guild.id}`).ticket_by);//rootusertarafındankodlanmıştır
          channel.updateOverwrite(meember, {
            VIEW_CHANNEL: true,
            SEND_MESSAGES: true,
            ATTACH_FILES: true,
            READ_MESSAGE_HISTORY: true,
          })
          channel.updateOverwrite((await db.get(`Staff_${message.guild.id}.Admin`)), {
            VIEW_CHANNEL: true,
            SEND_MESSAGES: true,
            ATTACH_FILES: true,
            READ_MESSAGE_HISTORY: true,
          })
          channel.updateOverwrite((await db.get(`Staff_${message.guild.id}.Moder`)), {
            VIEW_CHANNEL: true,
            SEND_MESSAGES: true,
            ATTACH_FILES: true,
            READ_MESSAGE_HISTORY: true,
          })
          channel.setName(`ticket-${await db.get(`ticket_${channel.id}_${message.guild.id}`).count}`)
          let log_embed = new Discord.MessageEmbed()
            .setTitle(`Ticket tekrar açıldı`)
            .addField(`Ticket`, `<#${channel.id}>`)
            .addField(`Eyleme  göre`, `<@!${message.author.id}>`)
            .setTimestamp()
            .setColor(`GREEN`)
            .setFooter(message.guild.name, message.guild.iconURL())
          channelLog(log_embed)
        } catch (e) {
          return message.channel.send(`Bir hata oluştu. Lütfen tekrar deneyin!`);//rootusertarafındankodlanmıştır
        }
      }, 1000)
    }
  }
  if (command == prefix + 'yeniden-adlandır' || command == prefix + 'isim-ayarla') {
    if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.lineReply(`:x: Bu komut gerektirir \`MANAGE_MESSAGES\` izini gerekir..`);//rootusertarafındankodlanmıştır
    let channel = message.mentions.channels.first() || message.channel;
    const sfats = await db.get(`Staff_${message.guild.id}`)
    if (!sfats) return message.lineReply({ embed: { description: `Bu sunucunun önce yetkili rollerini ayarlaması gerekiyor! \`{prefix}yetkili-ayarla\``, color: 0x5865F2 } })//rootusertarafındankodlanmıştır
    if (await db.get(`ticket_${channel.id}_${message.guild.id}`)) {//rootusertarafındankodlanmıştır
      let args = message.content.split(' ').slice(1).join(' ');//rootusertarafındankodlanmıştır
      if (!args) return message.lineReply({ embed: { description: `Lütfen ticket için istediğiniz ismi seçin`, color: 0x5865F2 } })//rootusertarafındankodlanmıştır
      channel.setName(args)//rootusertarafındankodlanmıştır
      message.delete()//rootusertarafındankodlanmıştır
      let log_embed = new Discord.MessageEmbed()//rootusertarafındankodlanmıştır
        .setTitle(`Ticket kanal isimi değişti`)//rootusertarafındankodlanmıştır
        .addField(`Yeni isim`, args)//rootusertarafındankodlanmıştır
        .addField(`Ticket`, `<#${channel.id}>`)//rootusertarafındankodlanmıştır
        .addField(`<@!${message.author.id}>`, `tarafından`)//rootusertarafındankodlanmıştır
        .setTimestamp()//rootusertarafındankodlanmıştır
        .setColor(0x5865F2)//rootusertarafındankodlanmıştır
        .setFooter(message.guild.name, message.guild.iconURL())//rootusertarafındankodlanmıştır
      channelLog(log_embed)//rootusertarafındankodlanmıştır
    }//rootusertarafındankodlanmıştır
  }//rootusertarafındankodlanmıştır
  if (command == prefix + 'yetkili-ayarla'){//rootusertarafındankodlanmıştır
    console.log(args)//rootusertarafındankodlanmıştır
    if (!message.member.hasPermission('ADMINISTRATOR')) return message.lineReply(`:x: Bu komut gerektirir \`ADMINISTRATOR\` izini gerekir..`);//rootusertarafındankodlanmıştır
    if (args.length != 2) return message.lineReply({ embed: { description: `Lütfen bu komutla bir Yönetici rol idsi, *sonra* bir Moderatör rol idsi sağlayın! `, color: 0x5865F2 } })
    if (message.mentions.roles.length < 2 && !Number(args[0]) && !Number(args[1])) return message.lineReply({ embed: { description: `Lütfen bu komutla önce bir Yönetici rolünden (veya iD), *sonra* bir Moderatör rolünden (veya iD) bahsedin! `, color: 0x5865F2 } })
    const Admin = message.guild.roles.cache.get(args[0]);//rootusertarafındankodlanmıştır
    const Moder = message.guild.roles.cache.get(args[1]);//rootusertarafındankodlanmıştır
    await db.set(`Staff_${message.guild.id}.Admin`, Admin.id)//rootusertarafındankodlanmıştır
    await db.set(`Staff_${message.guild.id}.Moder`, Moder.id)//rootusertarafındankodlanmıştır
    message.react("✅")//rootusertarafındankodlanmıştır
  }//rootusertarafındankodlanmıştır
  if (command == prefix + 'kanal-ayarla'){//rootusertarafındankodlanmıştır
    if (!message.member.hasPermission('ADMINISTRATOR')) return message.lineReply(`:x: Bu komut gerektirir \`ADMINISTRATOR\` izini gerekir..`);//rootusertarafındankodlanmıştır
    if (args.length != 2) return message.lineReply({ embed: { description: `Lütfen bu komutla bir kanal idsi, *sonra* bir kategori idsi belirtin! `, color: 0x5865F2 } })
    if (message.mentions.roles.length < 2 && !Number(args[0]) && !Number(args[1])) return message.lineReply({ embed: { description: `Lütfen bu komutla bir Log Kanalı (veya iD), *sonra* bir Kategori (veya iD) belirtin! `, color: 0x5865F2 } })
    const txt = message.guild.channels.cache.get(args[0]);//rootusertarafındankodlanmıştır
    const cat = message.guild.channels.cache.get(args[1]);//rootusertarafındankodlanmıştır
    if (txt.type !== "text") return message.channel.send("İlk giriş bir metin kanalı olmalıdır");//rootusertarafındankodlanmıştır
    if (cat.type !== "category") return message.channel.send("İkinci giriş bir metin kategorisi olmalıdır");//rootusertarafındankodlanmıştır
    await db.set(`Channels_${message.guild.id}.Log`, txt.id)//rootusertarafındankodlanmıştır
    await db.set(`Channels_${message.guild.id}.Cat`, cat.id)//rootusertarafındankodlanmıştır
    message.react("✅")//rootusertarafındankodlanmıştır
  }//rootusertarafındankodlanmıştır
  if (command == prefix + 'ticket-gönder' || command == prefix + 'ticket') {//rootusertarafındankodlanmıştır
    if (!message.member.hasPermission('ADMINISTRATOR')) return message.lineReply(`:x: Bu komut gerektirir \`ADMINISTRATOR\` izini gerekir..`);//rootusertarafındankodlanmıştır
    const sfats = await db.get(`Staff_${message.guild.id}`)//rootusertarafındankodlanmıştır
    const sfas = await db.get(`Channels_${message.guild.id}`)//rootusertarafındankodlanmıştır
    if (!sfats || sfats === null) return message.lineReply({ embed: { description: `Bu sunucunun önce personel rollerini ayarlaması gerekiyor! \`${prefix}yetkili-ayarla\``, color: 0x5865F2 } })//rootusertarafındankodlanmıştır
    if (!sfas || sfas === null) return message.lineReply({ embed: { description: `Bu sunucunun önce ticket kanallarını kurması gerekiyor! \`${prefix}kanal-ayarla\``, color: 0x5865F2 } })//rootusertarafındankodlanmıştır
    let idd = randomstring.generate({ length: 20 })//rootusertarafındankodlanmıştır
    let args = message.content.split(' ').slice(1).join(' ');//rootusertarafındankodlanmıştır
    if (!args) args = `Ticketler`//rootusertarafındankodlanmıştır
    let button1 = new MessageMenuOption()//rootusertarafındankodlanmıştır
    .setLabel('Özel Destek')//rootusertarafındankodlanmıştır
    .setEmoji('🔴')//rootusertarafındankodlanmıştır
    .setValue("men")//rootusertarafındankodlanmıştır
    .setDescription('Bunu yalnızca Yöneticilerle iletişim kurmak için kullanın!')//rootusertarafındankodlanmıştır
    let button3 = new MessageMenuOption()//rootusertarafındankodlanmıştır
    .setLabel('Genel Destek')//rootusertarafındankodlanmıştır
    .setEmoji('🟠')//rootusertarafındankodlanmıştır
    .setValue("hlp")//rootusertarafındankodlanmıştır
    .setDescription('Yardımcılar ve daha yüksek rütbelerle iletişime geçmek için bunu kullanın!')  //rootusertarafındankodlanmıştır
    let select = new MessageMenu()//rootusertarafındankodlanmıştır
    .setID(idd)//rootusertarafındankodlanmıştır
    .setPlaceholder('Ticket Oluştur')//rootusertarafındankodlanmıştır
    .setMaxValues(1)//rootusertarafındankodlanmıştır
    .setMinValues(1)//rootusertarafındankodlanmıştır
    .addOptions(button1, button3)//rootusertarafındankodlanmıştır
    let embed = new Discord.MessageEmbed()//rootusertarafındankodlanmıştır
      .setTitle(args)//rootusertarafındankodlanmıştır
      .setDescription("Ticket oluşturmak için menüden aşağıdaki seçeneklerden birini seçiniz.")//rootusertarafındankodlanmıştır
      .setThumbnail(message.guild.iconURL())//rootusertarafındankodlanmıştır
      .setTimestamp()//rootusertarafındankodlanmıştır
      .setColor(0x5865F2)//rootusertarafındankodlanmıştır
      .setFooter(message.guild.name, message.guild.iconURL())//rootusertarafındankodlanmıştır
    let msg = await message.channel.send({ embed: embed, component: select }).then(async msg => {//rootusertarafındankodlanmıştır
      msg.pin()//rootusertarafındankodlanmıştır
      let log_embed = new Discord.MessageEmbed()//rootusertarafındankodlanmıştır
        .setTitle(`Yeni ticketlerin açılması için bir mesaj gönderildi`)//rootusertarafındankodlanmıştır
        .addField(`Kanal`, `<#${message.channel.id}>`)//rootusertarafındankodlanmıştır
        .addField(`<@!` + message.author.id + `>`,`tarafından`)//rootusertarafındankodlanmıştır
        .setTimestamp()//rootusertarafındankodlanmıştır
        .setColor(0x5865F2)//rootusertarafındankodlanmıştır
        .setFooter(message.guild.name, message.guild.iconURL())//rootusertarafındankodlanmıştır
      channelLog(log_embed)//rootusertarafındankodlanmıştır
      await db.set(`tickets_${idd}_${message.guild.id}`, {//rootusertarafındankodlanmıştır
        reason: args,//rootusertarafındankodlanmıştır
        msgID: msg.id,//rootusertarafındankodlanmıştır
        id: idd,//rootusertarafındankodlanmıştır
        options: [button1,  button3],//rootusertarafındankodlanmıştır
        guildName: message.guild.name,//rootusertarafındankodlanmıştır
        guildAvatar: message.guild.iconURL(),//rootusertarafındankodlanmıştır
        channelID: message.channel.id//rootusertarafındankodlanmıştır
      })//rootusertarafındankodlanmıştır
    })//rootusertarafındankodlanmıştır
  }//rootusertarafındankodlanmıştır
})//rootusertarafındankodlanmıştır
//rootusertarafındankodlanmıştır
//rootusertarafındankodlanmıştır
client.on('clickMenu', async (button) => {//rootusertarafındankodlanmıştır
  console.log(button.values)//rootusertarafındankodlanmıştır
  if (await db.get(`tickets_${button.id}_${button.message.guild.id}`)) {//rootusertarafındankodlanmıştır
    await button.reply.send(`Ticket işleniyor. Lütfen bekleyin `, true)//rootusertarafındankodlanmıştır
    await db.math(`counts_${button.message.id}_${button.message.guild.id}`, `+`, 1)//rootusertarafındankodlanmıştır
    let count = await db.get(`counts_${button.message.id}_${button.message.guild.id}`)//rootusertarafındankodlanmıştır
    let channel;//rootusertarafındankodlanmıştır
    await button.clicker.fetch();//rootusertarafındankodlanmıştır
    if (button.values[0] === "men") { //rootusertarafındankodlanmıştır
      button.guild.channels.create(`ticket-${count}`, {//rootusertarafındankodlanmıştır
        permissionOverwrites: [//rootusertarafındankodlanmıştır
          {//rootusertarafındankodlanmıştır
            id: button.guild.roles.everyone,//rootusertarafındankodlanmıştır
            deny: ['VIEW_CHANNEL'],//rootusertarafındankodlanmıştır
          },//rootusertarafındankodlanmıştır
          {//rootusertarafındankodlanmıştır
            id: (await db.get(`Staff_${button.message.guild.id}.Admin`)),//rootusertarafındankodlanmıştır
            allow: ['VIEW_CHANNEL', `READ_MESSAGE_HISTORY`, `ATTACH_FILES`, `SEND_MESSAGES`,`MANAGE_MESSAGES`],//rootusertarafındankodlanmıştır
          },//rootusertarafındankodlanmıştır
          {//rootusertarafındankodlanmıştır
            id: button.clicker.user.id,//rootusertarafındankodlanmıştır
            allow: ['VIEW_CHANNEL', `READ_MESSAGE_HISTORY`, `ATTACH_FILES`, `SEND_MESSAGES`],//rootusertarafındankodlanmıştır
          },//rootusertarafındankodlanmıştır
        ], parent: (await db.get(`Channels_${button.message.guild.id}.Cat`)), position: 1, topic: `Ticket : <@!${button.clicker.user.id}>`, reason: "Tüm hakları Rootuser'e Aittir"//rootusertarafındankodlanmıştır
      }).then(async channel => {//rootusertarafındankodlanmıştır
        channel = channel//rootusertarafındankodlanmıştır
        await db.set(`ticket_${channel.id}_${button.message.guild.id}`, { count: count, ticket_by: button.clicker.user.id })//rootusertarafındankodlanmıştır
      //rootusertarafındankodlanmıştır
        await button.reply.edit(`
  **Ticketiniz başarıyla açıldı!** <#${channel.id}>`, true)//rootusertarafındankodlanmıştır
            let log_embed = new Discord.MessageEmbed()//rootusertarafındankodlanmıştır
              .setTitle(`Ticket açıldı!`)//rootusertarafındankodlanmıştır
              .addField(`Ticket`, `<#${channel.id}>`)//rootusertarafındankodlanmıştır
              .addField(`Ticketi açan`, `<@!${button.clicker.user.id}>`)//rootusertarafındankodlanmıştır
              .addField(`Ticket Numarası`, count)//rootusertarafındankodlanmıştır
              .setTimestamp()//rootusertarafındankodlanmıştır
              .setColor(`GREEN`)//rootusertarafındankodlanmıştır
            channelLog(log_embed)//rootusertarafındankodlanmıştır
        const embedticket = new Discord.MessageEmbed()//rootusertarafındankodlanmıştır
          .setTimestamp()//rootusertarafındankodlanmıştır
          .setTitle("Özel Destek")//rootusertarafındankodlanmıştır
          .setFooter(`Ticket açıldı!`)//rootusertarafındankodlanmıştır
          .setColor(0x5865F2)//rootusertarafındankodlanmıştır
          .setDescription(`En yakın zamanda iletişime geçilecektir.\n
      Ticketi kapatmak için 🔒 emojisine tıklayınız 🔒`)//rootusertarafındankodlanmıştır
        let idd = randomstring.generate({ length: 25 })//rootusertarafındankodlanmıştır
        let bu1tton = new disbut.MessageButton()//rootusertarafındankodlanmıştır
          .setStyle(`gray`)//rootusertarafındankodlanmıştır
          .setEmoji(`🔒`)//rootusertarafındankodlanmıştır
          .setLabel(`Close`)//rootusertarafındankodlanmıştır
          .setID(idd)//rootusertarafındankodlanmıştır
        channel.send(`Merhaba <@!${button.clicker.user.id}>`, { embed: embedticket, component: bu1tton }).then(msg => {//rootusertarafındankodlanmıştır
          msg.pin()//rootusertarafındankodlanmıştır//rootusertarafındankodlanmıştır
        })//rootusertarafındankodlanmıştır
        })//rootusertarafındankodlanmıştır//rootusertarafındankodlanmıştır
      }
        if (button.values[0] === "hlp"){//rootusertarafındankodlanmıştır
          button.guild.channels.create(`ticket-${count}`, {//rootusertarafındankodlanmıştır
            permissionOverwrites: [//rootusertarafındankodlanmıştır
              {//rootusertarafındankodlanmıştır
                id: button.guild.roles.everyone,//rootusertarafındankodlanmıştır
                deny: ['VIEW_CHANNEL'],//rootusertarafındankodlanmıştır
              },//rootusertarafındankodlanmıştır
              {//rootusertarafındankodlanmıştır
                id: (await db.get(`Staff_${button.message.guild.id}.Admin`)),//rootusertarafındankodlanmıştır
                allow: ['VIEW_CHANNEL', `READ_MESSAGE_HISTORY`, `ATTACH_FILES`, `SEND_MESSAGES`,`MANAGE_MESSAGES`],//rootusertarafındankodlanmıştır
              },//rootusertarafındankodlanmıştır
              {//rootusertarafındankodlanmıştır
                id: (await db.get(`Staff_${button.message.guild.id}.Moder`)),//rootusertarafındankodlanmıştır
                allow: ['VIEW_CHANNEL', `READ_MESSAGE_HISTORY`, `ATTACH_FILES`, `SEND_MESSAGES`,`MANAGE_MESSAGES`],//rootusertarafındankodlanmıştır
              },//rootusertarafındankodlanmıştır
              {//rootusertarafındankodlanmıştır
                id: button.clicker.user.id,//rootusertarafındankodlanmıştır
                allow: ['VIEW_CHANNEL', `READ_MESSAGE_HISTORY`, `ATTACH_FILES`, `SEND_MESSAGES`],
              },
            ], parent: (await db.get(`Channels_${button.message.guild.id}.Cat`)), position: 1, topic: `Ticket : <@!${button.clicker.user.id}>`, reason: "Tüm hakları Rootuser'e Aittir"
          }).then(async channel => {//rootusertarafındankodlanmıştır
            channel = channel//rootusertarafındankodlanmıştır
            await db.set(`ticket_${channel.id}_${button.message.guild.id}`, { count: count, ticket_by: button.clicker.user.id })//rootusertarafındankodlanmıştır
          //rootusertarafındankodlanmıştır
            await button.reply.edit(`
      **Ticketiniz başarıyla açıldı!** <#${channel.id}>`, true)//rootusertarafındankodlanmıştır
                let log_embed = new Discord.MessageEmbed()//rootusertarafındankodlanmıştır
                  .setTitle(`Ticket açıldı!`)//rootusertarafındankodlanmıştır
                  .addField(`Ticket`, `<#${channel.id}>`)//rootusertarafındankodlanmıştır
                  .addField(`Ticketi açan`, `<@!${button.clicker.user.id}>`)//rootusertarafındankodlanmıştır
                  .addField(`Ticket Numarası`, count)//rootusertarafındankodlanmıştır
                  .setTimestamp()//rootusertarafındankodlanmıştır
                  .setColor(`GREEN`)//rootusertarafındankodlanmıştır
                channelLog(log_embed)//rootusertarafındankodlanmıştır
            const embedticket = new Discord.MessageEmbed()//rootusertarafındankodlanmıştır
              .setTimestamp()
              .setTitle("Genel Destek")
              .setFooter(`Ticket Açıldı!`)
              .setColor(0x5865F2)
              .setDescription(`En yakın zamanda iletişime geçilecektir.\n
      Ticketi kapatmak için 🔒 emojisine tıklayınız`)
            let idd = randomstring.generate({ length: 25 })
            await db.set(`close_${button.clicker.user.id}`, idd)
            let bu1tton = new disbut.MessageButton()
              .setStyle(`gray`)
              .setEmoji(`🔒`)
              .setLabel(`Kapat`)
              .setID(idd)
            channel.send(`👋 Merhaba <@!${button.clicker.user.id}>`, { embed: embedticket, component: bu1tton }).then(msg => {
              msg.pin()
            })
            })
        }
      }
    });//rootusertarafındankodlanmıştır
      client.on('clickButton', async (button1) => {
        await button1.clicker.fetch()
        let idd = randomstring.generate({ length: 25 })
        await db.set(`close_${button1.clicker.user.id}_sure`, idd)
        if (button1.id == (await db.get(`close_${button1.clicker.user.id}`))) {
          let bu0tton = new disbut.MessageButton()
            .setStyle(`red`)
            .setLabel(`close`)
            .setID(idd)
          await button1.reply.send(`Bu ticket'i kapatmak istediğinizden emin misiniz?`, { component: bu0tton, ephemeral: true });//rootusertarafındankodlanmıştır
        }
      })
        client.on('clickButton', async (button) => {
          await button.clicker.fetch()
          if (button.id == (await db.get(`close_${button.clicker.user.id}_sure`))) {
          await button.reply.send(`Ticket 5 saniye sonra kapatılacaktır!`, true)   
            let ch = button.channel
            if (!ch) return;
            setTimeout(async () => {
              try {
                await ch.send({ embed: { description: `Ticket Çoktan Kapatıldı! <@!${button.clicker.user.id}>`, color: `YELLOW` } });//rootusertarafındankodlanmıştır
                let type = 'member'
                await Promise.all(ch.permissionOverwrites.filter(o => o.type === type).map(o => o.delete()));//rootusertarafındankodlanmıştır
                ch.setName(`closed-ticket`)
                let log_embed = new Discord.MessageEmbed()
                  .setTitle(`Ticket Kapatıldı`)
                  .addField(`Ticket`, `<#${ch.id}>`)
                  .addField(`Kapatan Kişi`, `<@!${button.clicker.user.id}>`)
                  .setTimestamp()
                  .setColor(`YELLOW`)
                channelLog(log_embed)
              } catch (e) {
                return button.channel.send(`Bir hata oluştu. Lütfen tekrar deneyin!`);//rootusertarafındankodlanmıştır
              }
            }, 4000)
          }
        })
client.login("ODkxMDE4ODQwNzM2MTQxMzIy.YU4P9Q.kMVUs6ZhwkjEnUU7bcQsp0dkFr4");//rootusertarafındankodlanmıştır
