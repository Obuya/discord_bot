const Discord = require('discord.js');
 module.exports =  {
    name: 'user-info',
    description: 'Displays info about a user or yourself',
    aliases:['info','deets'],
    execute(message, args){

    const data = [];

    var person = message.author;

    if (args[0] && message.mentions.users.first() != undefined) {
        person = message.mentions.users.first();
    }
    else if (args[0]) {
        return;
    }
    person  = message.guild.members.cache.get(person.id);
    console.log(`this is ${message.guild.members.cache.get(person.id)}`);
    const {roles} = message.guild;
    var r = [];

    roles.cache.map(role =>{
        if(role.members.find(member => member.id === person.id)){
            if(role.name != '@everyone')
            r.push(`\`${role.name}\``);
        }
    });
    
    const userInfoEmbed = {
        color: 0x0099ff,
        author: {
            name: 'n/a',
        },
        thumbnail: {
            url: 'https://i.imgur.com/wSTFkRM.png',
        },
        fields: [
            {
                name: '**Discord ID: **',
                value: 'n/a',
            },
            {
                name: '**Nickname: **',
                value: 'n/a',
                inline: true,
            },
            {
                name: '**Name: **',
                value: 'n/a',
                inline: true,
            },
            {
                name: '**Status: **',
                value: 'n/a',
                inline: true,
            },
            {
                name: '**Logged On Device(s): **',
                value: 'n/a',
                inline: true,
            },
            {
                name: '**Account Created On: **',
                value: 'n/a',
                inline: true,
            },
            {
                name: '**Joined On: **',
                value: 'n/a',
                inline: true,
            },
            {
                name: '**Permissions: **',
                value: 'n/a',
                inline: false,
            },
            {
                name: '**Roles Assigned: **',
                value: 'n/a',
                inline: false,
            },
        ],
        timestamp: new Date(),
    };

    userInfoEmbed.author.name = ` Information About ***${person.user.tag}***`;
    userInfoEmbed.thumbnail.url = ` ${person.user.avatarURL({format:'png',dynamic: true})}?size=256`;

    //Discord id
    if(person.id)
    userInfoEmbed.fields[0].value = ` **${person.id}**`;
    //Nickname
    if(person.id)
    userInfoEmbed.fields[1].value = ` <@!${person.id}>`;
    //Name
    if(person.user.tag)
    userInfoEmbed.fields[2].value = ` ${person.user.tag}`;
    //Status
    if(person.presence.status)
        userInfoEmbed.fields[3].value = ` ${person.presence.status}`;
    //logged on device(s)
    if(person.user.presence.clientStatus != null || person.user.presence.clientStatus)
        if(Object.keys(person.user.presence.clientStatus) !='')
            userInfoEmbed.fields[4].value = `${ Object.keys(person.user.presence.clientStatus)}`;
       // console.log(`${Object.keys(person.user.presence.clientStatus)}`);
    //account Creation
    if(person.user.createdAt)
        userInfoEmbed.fields[5].value = ` ${person.user.createdAt.toDateString()}`;
    //joined on 
    if(person.joinedAt)
    userInfoEmbed.fields[6].value = ` ${person.joinedAt.toDateString()}`;
    //Permissions
    if(person.permissions.bitfield)
    userInfoEmbed.fields[7].value = ` ${person.permissions.bitfield}`;
    //Roles Assigned
    userInfoEmbed.fields[8].value = `${r.join(", ")}`;

    return message.channel.send({embed: userInfoEmbed});

    }
}


