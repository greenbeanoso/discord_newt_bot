const { Client, Events, GatewayIntentBits } = require('discord.js');
var index
const TOKEN = 'MTEzMTg3NzMyMDY3MjY4MjA1NA.Gysj9Y._9J6fi7lE_18FesYKdQDVIjyVj3etJHXXE-3Kc';
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});
client.on(Events.MessageCreate, (message) => {
  if (message.author.bot) return;
  if (message.content == '!說句話'){
    if (`${message.member.nickname}` != null){
      message.channel.send(`${message.member.nickname}好帥`);
    } else {
      message.channel.send(`${message.member.uesername}好帥`);
    }
  }
  if (message.content[0] == '呼'&& message.content[1] == '叫'&& message.content[2] == ':'){
    console.log("有人用呼叫")
    let arr = message.content.split(":")
    console.log(arr[1])
    for (index = 0; index < 10; index++) {
      function sendMessage(msg, arrCopy) {
        return function() {
          msg.channel.send('呼叫'+arrCopy[1]);
        }
      }
      setTimeout(sendMessage(message, arr),3000*index);
    }
    
  }
  if (message.content == '!閉嘴'){
    index = 10
    message.channel.send('好啦,幹嘛兇人家');
  }
});

client.login(TOKEN);
