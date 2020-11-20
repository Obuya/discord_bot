module.exports = {

    name: "av",
    description: 'gets and displays users profile pic',
    aliases:['pfp'],
    usage: "[user]",
    execute(message,args){

        const embed = { title: 'Avatar', image: { url: " " }};

        var person = message.author;

        if (args[0] && message.mentions.users.first() != undefined) {
            person = message.mentions.users.first();
        }
        else if (args[0]) {
            return;
        }
        embed.image.url = person.avatarURL({ format: "png", dynamic: true }) + "?size=256";
        message.channel.send({ embed: embed });

    } 


}