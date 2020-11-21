const { TOKEN,} = require("./config.json")

const { Client, MessageEmbed } = require('discord.js');
const client = new Client();


client.on("ready", () => {
    console.log("[--------------------- R E A D Y ---------------------]");
  client.user.setUsername("Wumpus");
  client.user.setPresence({ activity : { name: 'w!help' }, status: 'dnd' });
})




client.on('message', message => {
  if (message.content === 'w!emoji' ||message.content === 'w!emojis' ) {

    const embed = new MessageEmbed()
      .setTitle('Commands')
      .setColor(0xff0000)
      .setDescription(`\`starter emojis\`

     \`make sure to give me MANAGE_WEBHOOKS To send emojis\`

     \`:verifytick:\`
     \`:partyblob:\`
     \`:nitro:\`
     \`:boost:\`
     \`:wump:\`  `)
    message.channel.send(embed);
  }
}); 




client.on("message", async (message) => {
  if (message.author.bot) return;
    let substringArray = get_substrings_between(message.content, ":", ":");
  let msg = message.content;
  if (!substringArray.length) return;

  substringArray.forEach(m => {
    let emoji = client.emojis.cache.find(x => x.name === m);
    var replace = `:${m}:`;
    var rexreplace = new RegExp(replace, 'g');

    if (emoji && !msg.split(" ").find(x => x === emoji.toString()) && !msg.includes(`<a${replace}${emoji.id}>`)) msg = msg.replace(rexreplace, emoji.toString());
  })


  if (msg === message.content) return;

  let webhook = await message.channel.fetchWebhooks();
  webhook = webhook.find(x => x.name === "Wumpus");

  if (!webhook) {
    webhook = await message.channel.createWebhook(`Wumpus`, {
      avatar: client.user.displayAvatarURL({ dynamic: true })
    });
  }

  await webhook.edit({
    name: message.member.nickname ? message.member.nickname : message.author.username,
    avatar: message.author.displayAvatarURL({ dynamic: true })
  })

  message.delete().catch(m => { })

  webhook.send(msg).catch(m => { });

  await webhook.edit({
    name: `Wumpus`,
    avatar: client.user.displayAvatarURL({ dynamic: true })
  })


})


client.login("Nz"+"Y5ODUyODQwMTI1OTIzMzU4.X5VDVA.lk2YynGO0z7pk6_lImiA5ES37yo")


//--------------------------------------------------- F U N C T I O N S --------------------------------------

function get_substrings_between(str, startDelimiter, endDelimiter) {
  var contents = [];
  var startDelimiterLength = startDelimiter.length;
  var endDelimiterLength = endDelimiter.length;
  var startFrom = contentStart = contentEnd = 0;

  while (false !== (contentStart = strpos(str, startDelimiter, startFrom))) {
    contentStart += startDelimiterLength;
    contentEnd = strpos(str, endDelimiter, contentStart);
    if (false === contentEnd) {
      break;
    }
    contents.push(str.substr(contentStart, contentEnd - contentStart));
    startFrom = contentEnd + endDelimiterLength;
  }

  return contents;
}


function strpos(haystack, needle, offset) {
  var i = (haystack + '').indexOf(needle, (offset || 0));
  return i === -1 ? false : i;
}
