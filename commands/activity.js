module.exports = {

    name: "setAct",
    description: 'sets bot\'s activity',
    aliases:['act'],
    usage: "[user]",
    execute(message,args){

        bot.user.setActivity(args[0], { type: "WATCHING" });
    } 


}