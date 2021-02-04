const Discord = require('discord.js');
module.exports = {

    name: "setAct",
    description: 'sets bot\'s activity',
    aliases:['act'],
    usage: "[message]",
    execute(message,args){

        bot.user.setActivity(args[0], { type: "WATCHING" });
    } 


}