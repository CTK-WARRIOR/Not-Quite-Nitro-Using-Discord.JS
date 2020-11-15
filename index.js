const discord = require("discord.js");
const client = new discord.Client();

client.on("ready", () => {
    console.log("[--------------------- R E A D Y ---------------------]");
    client.user.setActivity("I am NQN 2");
})

client.on("message", async (message) => {
    if(message.author.bot) return;
    let substringArray = get_substrings_between(message.content, ":", ":");
    let msg = message.content;
    if(!substringArray.length) return;

    substringArray.forEach(m => {
        let emoji = client.emojis.cache.find(x => x.name === m);
        var replace = `:${m}:`;
        var rexreplace = new RegExp(replace, 'g');

        if(emoji && !msg.split(" ").find(x => x === emoji.toString()) && !msg.includes(`<a${replace}${emoji.id}>`)) msg = msg.replace(rexreplace, emoji.toString());
    })
    

    if(msg === message.content) return;

    let webhook = await message.channel.fetchWebhooks();
    webhook = webhook.find(x => x.name === "NQN2");

    if(!webhook) {
        webhook = await message.channel.createWebhook(`NQN2`, {
            avatar: client.user.displayAvatarURL({dynamic: true})
        });
    }

    await webhook.edit({
        name: message.member.nickname ? message.member.nickname : message.author.username,
        avatar: message.author.displayAvatarURL({dynamic: true})
    })

    message.delete().catch(m => {})

    webhook.send(msg).catch( m => {});

    await webhook.edit({
        name: `NQN2`,
        avatar: client.user.displayAvatarURL({dynamic:true})
    })

 
})



client.login("NzI1MDI2NDg3NjE0MzA4NDMz.XvIviA.cyfOXZn987pX9ZRNO9lDjwSRPGQ");


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