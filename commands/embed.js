const Discord = require('discord.js');

module.exports = {

    name: 'embed',
    descrption: 'embeds given message',

    execute(message, args){
       console.log(args);
       console.log(args.join(" "));
       
        const embed = { color: 3447003,title: 'obuya is a god',description:"gods dont die, niether shall i."};
        message.channel.send({ embed: embed });


        
    }
}