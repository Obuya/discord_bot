const Discord = require('discord.js');
const fs = require('fs');
const random = require('random');
const jsonfile = require('jsonfile');
const {prefix, token} = require("./config.json");

const bot = new Discord.Client();
bot.commands = new Discord.Collection();
const cooldowns = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for(const file of commandFiles){

    const command = require('./commands/' + file);

    bot.commands.set(command.name,command);
}
function emoji(id) {

    return bot.emojis.cache.get(id).toString();
}
bot.login(token);

//RUNS ON READY
bot.on('ready',  () => {
    console.log("Logged in as: " + bot.user.tag);
    //bot.user.setActivity("Reading All Ya Messages");
    bot.user.setActivity("you Type", {type: "WATCHING"});

});


// LOADS STATS FILE IF IT EXITS (FOR THE LEVELING SYSTEM)
var stats = {};
if (fs.existsSync("stats.json")){


  stats = jsonfile.readFileSync('stats.json');
}
// RUNS EVERYTIME A MESSAGE IS SENT
bot.on('message', async msg => {

    if(msg.channel.id == '665003778747138074'){
        if(msg.content.search(/ayub/i) > -1)
            msg.react('676204027033288784'); //eggplant animated emoji
        else if(msg.content.search(/chris/i) > -1)
            msg.react('677026199628808251'); // ahego pepe animated emoji
        else if(msg.content.search(/muk/i) > -1)
            msg.react('676206796003606539'); // pingu emoji  
    }
	if(msg.author == "722512189881319464")
	{
	    msg.react('😐');
	}
	if(msg.channel.id == '681168256127467540'){
	    msg.react('✅');
	    msg.react('❎');
	}
    if(!msg.content.startsWith(prefix) || msg.author.bot)
        return;
    const args = msg.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();

    //if(!bot.commands.has(commandName)) return;
    const command = bot.commands.get(commandName)
		|| bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if(!command) return;
    
    if(!cooldowns.has(command.name)){
        cooldowns.set(command.name, new Discord.Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 0) * 1000;

    if (timestamps.has(command.name)) {
        const expirationTime = timestamps.get(command.name) + cooldownAmount;
    
        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return msg.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`).then( m => {m.delete({ timeout: timeLeft })});
        }
    }
    timestamps.set(command.name, now);
    setTimeout(() => timestamps.delete(command.name), cooldownAmount);

    try{

        command.execute(msg,args);
    }
    catch(error){
        
        console.error(error);
        msg.reply("there was an error performing the command! try again!");
    }
    
});

bot.on('voiceStateUpdate', async (oldM, newM) => {

    let newUserChannel = newM.channel;
    let oldUserChannel = oldM.channel;

    // console.log(newM.channel);
    // console.log(oldM.channel);
    var roleName = "VC-CHAT";;

    //chan = newM.guild.channels.cache.find(chan => chan.name === roleName.toLowerCase());
    //if(chan)
    //    chan.bulkDelete(99);

    if (oldUserChannel === null && newUserChannel !== null) {

        //user joins
        role = newM.guild.roles.cache.find(role => role.name == roleName);

        if (!role) {
            role = await newM.guild.roles.create({ data: { color: "#03dffc", hoist: true, name: roleName } });
        }
        channel = await newM.guild.channels.cache.find(channel => channel.name === roleName.toLowerCase());
        //console.log(channel);
        if (!channel && newM.guild.id == "665003778747138068") {
            channel = await newM.guild.channels.create(roleName, {
                type: 'text', permissionOverwrites: [
                    {
                        id: newM.guild.id,
                        deny: 'VIEW_CHANNEL'
                    },
                    {
                        id: role.id,
                        allow: 'VIEW_CHANNEL'
                    },
                ],
                parent: '673983634998296577',
                position: 6,
            });
            console.log('this wored ');
        }
        else if (!channel) {
            channel = await newM.guild.channels.create(roleName, {
                type: 'text', permissionOverwrites: [
                    {
                        id: newM.guild.id,
                        deny: 'VIEW_CHANNEL'
                    },
                    {
                        id: role.id,
                        allow: 'VIEW_CHANNEL'
                    },
                ]
            });
        }
        channel.overwritePermissions([
            {
                id: newM.guild.id,
                deny: ['VIEW_CHANNEL'],
            },
            {
                id: role.id,
                allow: ['VIEW_CHANNEL', 'MANAGE_MESSAGES'],
            },
        ]);
        newM.member.roles.add(role);
        //console.log('success');

    }

   else if(newUserChannel === null && oldUserChannel !== null){

    role = oldM.guild.roles.cache.find(role => role.name == roleName);
    oldM.member.roles.remove(role);
   channel = oldM.guild.channels.cache.find(channel => channel.name === roleName.toLowerCase());
   voice = oldM.guild.channels.cache.filter(channel => (channel.type === 'voice' && channel.members.size != 0));
   console.log(voice.size);
   if(voice.size === 0)
        channel.delete();
    
 // console.log(oldM.channel.members.size);
    //console.log(oldM);
   }
   

});
