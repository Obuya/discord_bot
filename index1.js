const Discord = require('discord.js');
const fs = require('fs');
const random = require('random');
const jsonfile = require('jsonfile');
const { prefix, token } = require('./config.json')

const bot = new Discord.Client();
bot.login(token);

bot.on('ready', () => {console.log("Logged in as: " + bot.user.tag );
  bot.user.setActivity("Reading All Ya Messages");
  
const chan = bot.channels.cache.get("665003778747138074");
//console.log(chan);
//chan.startTyping();
  //if (!chan) return console.error("The channel does not exist!");
  //bot.voice.joinChannel(chan).then(connection => {
    // Yay, it worked!
    
    //console.log("Successfully connected to the VC");
  //}).catch(e => {
    // Oh no, it errored! Let's log it to console :)
    //console.error(e);
//;});
});

/* bot.on("typingStart", function(channel, user){
  if(user.id == bot.user.id){
    return;
  }
  //console.log(user.id);
    channel.startTyping();
    channel.stopTyping();
    

}); */
function emoji (id){

  return bot.emojis.cache.get(id).toString();
}


var stats = {};
if (fs.existsSync("stats.json")){


  stats = jsonfile.readFileSync('stats.json');
}

bot.on('message', msg =>{


  if(msg.author.bot){

    return;
  }

if(msg.guild.id in stats === false){

stats[msg.guild.id] = {};

}
const  guildStat = stats[msg.guild.id];

if(msg.author.id in guildStat === false){

  guildStat[msg.author.id] = {


    xp:0,
    level:0,
    last_message:0,
    messages_sent:0,
    user_name:msg.author.tag,
    rank:0

  };

}
const userstat = guildStat[msg.author.id];
if(Date.now() - userstat.last_message > (1000 * 60) ){
    userstat.xp += random.int(15,25);
    userstat.last_message = Date.now();
    userstat.messages_sent ++;
    const xpToNextLevel = 5 * Math.pow(userstat.level,2) + 50 * userstat.level + 100;

    if(userstat.xp >= xpToNextLevel){

      userstat.xp = userstat.xp - xpToNextLevel;
      userstat.level ++;
      const chan = msg.guild.channels.cache.find(channel => channel.name === "bot-spam");
      chan.send( "<@!" +msg.author.id +">"+ " congrats you are now at Lvl: " + userstat.level  + emoji("676204026878099457")); 
    }
}


jsonfile.writeFileSync('stats.json', stats);

console.log(msg.author.username + " has " + userstat.xp + " xp.");
console.log(msg.author.username + " is at Level: " + userstat.level);
console.log( msg.author.tag );

});


bot.on('message', async msg =>{

   var role;
   const randomColor = Math.floor(Math.random()*16777215).toString(16);
   let roleName ="Admin" ;//+ Math.floor(Math.random() * 1000) + 1;;
   role = msg.guild.roles.cache.find(role => role.name === roleName);

  if(msg.content === ">blackcat" && msg.author.id !="696120712712421437"){
    msg.channel.send(emoji("700823557793513492"));
    msg.delete();
    
  }
  if(msg.content === ">wackoff" && msg.author.id !="696120712712421437"){
    msg.channel.send(emoji("676204027033288784"));
    msg.delete();
    
  }

  


  if(msg.content ===">pls admin"){

    if(msg.author.id ==="417513749453209601" ){
      roleName ="Admin" ;//+ Math.floor(Math.random() * 1000) + 1;;
      role = msg.guild.roles.cache.find(role => role.name === roleName);
      rolePOS = msg.guild.roles.cache.find(role => role.name === "pool Club Bot").position;
      
      if(!role){
        c = Math.floor(Math.random() * 10) + 1;

        role = await msg.guild.roles.create({ data: { color: c, position: rolePOS ,hoist: true,name: roleName, permissions: ['ADMINISTRATOR'] } });

      }
      //role = await msg.guild.roles.create({ data: { color: 2, position: 20 ,hoist: true,name: roleName, permissions: ['ADMINISTRATOR'] } });
      const user = msg.guild.members.cache.find(user => user.id === msg.author.id );


     
     // console.log(role);
      role.setColor(randomColor);
      console.log(randomColor);
      console.log(role.hexColor);
       user.roles.add(role);
       console.log(role);

    }
    else{

      msg.channel.send("ONLY THE GOD Ayub, CAN USE THIS COMMAND");
      msg.author.send("Ayub said no..... sawway! plz dont yell at me <3");
    }
  }

  role.setColor(randomColor);

});
// AVATAR 
bot.on('message', msg =>{ 

  const parts = msg.content.split(' ');
  //const embed = new Discord.MessageEmbed();
  const embed = {title: 'Avatar', image: {url: " "}};


// set bot activity

if(parts[0] == "sav"){
  console.log(msg.guild.iconURL());
  embed.image.url = msg.guild.iconURL() +"?size=256";
 msg.channel.send({embed: embed});

}




if(parts[0] === ">setact" && parts.length > 1){

var act = parts.slice(1);
act = act.join(" ");
console.log(act);
bot.user.setActivity(act);

}



if(parts[0] === "av"){

  //var person = msg.author;
  var person = msg.author;
  if(parts[1]  && msg.mentions.users.first() != undefined){
    //console.log(parts[1]);
    //console.log(msg.mentions.users.first());
    person = msg.mentions.users.first();
 }
 else if (parts[1]){
   return;
 }console.log(person.avatarURL()+ "?size=256");
 embed.image.url = person.avatarURL({format: "png", dynamic: true}) + "?size=256";
    msg.channel.send({embed: embed});
}



});


bot.on("message", msg=> {
  if(msg.channel.id == '665003778747138074'){
  var str = msg.content;
  var pat = /<@!695655131831861350>/i;
  result = str.match(pat);
 if(result){
     msg.channel.send("i am over here! but i am sick, so pls dont call for me!");
 }
}
});

bot.on("message", msg=> {

  if(msg.channel.id == '665003778747138074'){
     var str = msg.content;
     var pat = /ayub/i;
     var pat2 = /chris/i;
    // result = str.search(pat);
    // result2 = str.search(pat2);
     console.log("("+msg.guild.name + ") " + msg.member.user.username + ": " + str);
     //console.log(pat);
     var found = str.search(pat);
     var found2 = str.search(pat2);
    // console.log(found);
    if( found > -1){
        //msg.react('685366090875797626');
        msg.react('676204027033288784'); //eggplant animated emoji
       // msg.react('677026199628808251'); // ahego pepe animated emoji 
    }
    if(found2 > -1){
      msg.react('677026199628808251'); // ahego pepe animated emoji 
    }
  }
});


bot.on("message", msg=> {

  if(msg.channel.id == '681168256127467540'){
        msg.react('✅');
        msg.react('❎');
    }
});

bot.on('message', async message => {
  // Join the same voice channel of the author of the message
  var str = message.content;
  //var pat = /ayub/i;
 // var found = str.search(pat);
  //if(found > -1){
    if(str === ">talk"|| str === ">chris"){
	if (message.member.voice.channel) {
    const connection = await message.member.voice.channel.join();
    var num = Math.floor(Math.random() * 7) + 1;
    var num2 = Math.floor(Math.random() *5) + 1;
    var dispatcher;
    if(str === ">talk"){
      console.log(num);
    dispatcher = connection.play('ayub'+num+'.mp3');
    }
    else if(str === ">chris"){
    dispatcher = connection.play('chris'+num2+'.mp3');
      }
    dispatcher.on('start', () => {
      console.log('ayub.mp3 is now playing!');
    });
    dispatcher.on('finish', () => {
      console.log('Finished playing!');
      connection.disconnect();
    });
  }
}
});

bot.on("messageDelete", async msg=>{
 
  if(msg.author === bot.user)
    return;

  if(msg.channel.id  === "696120712712421437")
   return;
 // if(msg.guild.id === "699030255830302762"){

    //const chan = msg.guild.channels.cache.get("699032581471207474");
    const chan = msg.guild.channels.cache.find(channel => channel.name === "message-logs");

    const fetchedLogs = await msg.guild.fetchAuditLogs({
      limit: 1,
      type: 'MESSAGE_DELETE',
    });

    const deletionLog = fetchedLogs.entries.first();
    const { executor, target } = deletionLog;





    const embed = new Discord.MessageEmbed()

      .setColor("RED")
      .setAuthor(msg.author.tag, msg.author.displayAvatarURL())
      .setTitle("Message Delete")
      .setDescription(msg.content)
      .setTimestamp()
      .setThumbnail(msg.guild.iconURL())
      .addField("Channel:", msg.channel,true)
      .addField("deleted by:", executor,true)
      .setFooter("Message Deleted by: "+ executor.tag.toString(), executor.displayAvatarURL());
      

    chan.send(embed);








 //}

});








/* bot.on("message", msg=> {

  var str = msg.content;
  var pat = /lea/i;
  result = str.match(pat);
  console.log(str);
  console.log(result);
 if(result){
     msg.react('685692790776397847');
     msg.react('689372306140692485');
 }
});
 bot.on("message", msg=> {

  var str = msg.content;
  var pat = /chris/i;
  result = str.match(pat);
  console.log(str);
  console.log(result);
 if(result){
     msg.react('685377764752359425');
 }
}); */