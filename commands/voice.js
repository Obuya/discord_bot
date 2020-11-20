const random = require('random');
const fs = require('fs');

const voiceFiles = fs.readdirSync('./audio');
const personsVoice = {};
var prevNum; 
//console.log(voiceFiles);

for(const folder of voiceFiles){

    const files = fs.readdirSync(`./audio/${folder}`).filter(file => file.endsWith('.mp3'));

    personsVoice[`${folder.toLowerCase()}`] = files;
    

}
//console.log(personsVoice);

module.exports ={

    name: 'talk',
    description: 'plays a random voice file of a given user',
    aliases:['play','p','t'],
    cooldown: 3,
    playing: false,
    usage: '[person\'s firstname]',
    async execute(message,args){
        if(args.length > 1 )
            return;
        if(this.playing == true){
            message.delete();
            return message.reply("A recording is alrdy playing... fool");
        }
        
        if(message.member.voice.channel){

            if(!personsVoice[`${args[0].toLowerCase()}`])
                return message.reply('I dont seem to have any Voice files for this person :(');
            var number;
            do{
                 number = random.int(0,personsVoice[args[0].toLowerCase()].length - 1);
            }
            while(prevNum == number);
            
            prevNum = number;
            const connection = await message.member.voice.channel.join();
            var dispatcher;
            if(personsVoice[`${args[0].toLowerCase()}`]){
                //console.log(`${number} and ${personsVoice[args[0].toLowerCase()][number]}`);
                dispatcher = connection.play(`./audio/${args[0].toLowerCase()}/${personsVoice[args[0].toLowerCase()][number]}`);
            }
            var msg;
            dispatcher.on('start', async ()=>{
                //console.log(`playing: ${personsVoice[args[0].toLowerCase()][number]}`);
                this.playing = true;
                message.delete({ timeout: 500 });
                //msg = await message.channel.send(`\`\`\`css\nplaying:[${personsVoice[args[0].toLowerCase()][number]}]\n\`\`\``);
                message.channel.send(`\`\`\`css\nplaying:[${personsVoice[args[0].toLowerCase()][number]}]\n\`\`\``).then( m => {m.delete({ timeout: 5000 })});
            });
            dispatcher.on('finish', async () => {
                //msg.delete();
                this.playing = false;
                dispatcher.destroy();
                connection.disconnect();
            });

        }
    }
}