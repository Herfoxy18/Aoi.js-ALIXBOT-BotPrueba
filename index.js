const dbd = require("dbd.js")
 
const bot = new dbd.Bot({
  token: "tu prefix", 
  prefix: "$getServerVar[prefix]",
  fetchInvites: true
})
bot.onMessage()

const fs = require('fs');

const folders = fs.readdirSync('./commands/');

for (const files of folders) {
const folder = fs
.readdirSync(`./commands/${files}/`)
.filter(file => file.endsWith('.js'));

for (const commands of folder) {
const command = require(`./commands/${files}/${commands}`);
bot.command({
name: command.name,
code: command.code
});
}
}
//commands


bot.command({
name: "invites",
code: `
$title[$username's invite info]
$thumbnail[$authorAvatar]
$description[
Total: $sum[$userInfo[real];$userInfo[fake]]
Real: $userInfo[real]
Fake: $userInfo[fake]
---------------------
`
})

bot.command({
name: "resetInvites",
code: `
Successfully reset invites for $username[$mentioned[1]]
$resetInvites[$guildID;$mentioned[1]]
`
})


bot.command({
name: "<@877608213858635837>",
code: `$title[ENJOY THE FUN]
$description[Hola, <@$authorID> Gracias por mencionarme mi prefix es \`$getServerVar[prefix]\`]
$footer[ENJOY THE FUN]
$addTimestamp
$color[$getServerVar[color]]`,
nonPrefixed: true
})

bot.command({
name: "bell",
description: "Test your strength",
usage: "bell",
category: "fun",
code: `
$reactionCollector[$splitText[1];$authorID;24h;:bell:;awaitReaction1;yes]
$textSplit[$sendMessage[{author:$username tested their strength:$authorAvatar}{description:
:bell:}
{footer:Come test your strength}{color:YELLOW};yes]; ]`
})

bot.joinCommand({
 channel: "$getServerVar[welcomechannel]"
 ,
 code: `
 $title[BIENVENID@]
 $description [<@$authorID>, $getServerVar[wmessage] $membersCount]
 $image[https://cdn.discordapp.com/attachments/827271434539106304/835222444712263760/Bienvenida.png]
 $addTimestamp
 $footer[ENJOY THE FUN]
 $color[GREEN]` 
})
bot.onJoined()

bot.leaveCommand({
 channel: "$getServerVar[leavechannel]",
 code: `
 $title[HASTA LUEGO, espero que vuelvas『:< ]
 $description [<@$authorID>, $getServerVar[lmessage]
 $membersCount]
 $image[https://cdn.discordapp.com/attachments/827271434539106304/835230914110947348/20210423_150702.jpg]
 $addTimestamp 
 $footer[ENJOY THE FUN]
 $color[RED]` 
})
bot.onLeave()

bot.reactionAddCommand({
channel: "$getServerVar[tpanel]",
code: `$newTicket[ticket-$username;||<@$authorID>||{title:☀ENJOY SOPPORTE☀}
{description:**Hola <@$authorID> gracias por abrir un ticket espera a los staffs para que te atiendan **}
{color:YELLOW};828523343308521473;no;Hubo un error intentelo denuevo o consulte a flatbeart]
$clearReaction[829065878862692407;835251130215956482;$authorID;🎟️]
$onlyIf[$messageID==835251130215956482]
$onlyIf[$emojiToString==🎟️]`})
bot.onReactionAdd()

bot.awaitedCommand({
 name: "p2",
 code: `$awaitMessages[$authorID;20s;everything;p3;Time up!]
$sendMessage[Now please write your age...put anything except a number if you do not want to disclose it;no]
$setVar[name;$message;$authorID]`
});

bot.awaitedCommand({
 name: "p3",
 code: `$awaitMessages[$authorID;20s;everything;p4;Time up!]
$sendMessage[Enter your favorite pet!;no]
$setVar[age;$message;$authorID]`
});

bot.awaitedCommand({
 name: "p4",
 code: `$awaitMessages[$authorID;20s;everything;p5;Time up!]
$sendMessage[Enter the place where you live in!;no]
$setVar[pet;$message;$authorID]`
});

bot.awaitedCommand({
 name: "p5",
 code: `$awaitMessages[$authorID;5m;everything;p6;Time up!]
$sendMessage[Enter your hobbies!;no]
$setVar[country;$message;$authorID]`
});

bot.awaitedCommand({
 name: "p6",
 code: `$awaitMessages[$authorID;5m;everything;p7;Time up!]
$sendMessage[Now, for the final step, enter things about yourself!;no]
$setVar[hobbies;$message;$authorID]`
});

bot.awaitedCommand({
 name: "p7",
 code: `$sendMessage[{title:Profile View!} {description:$customEmoji[right] \`Name\`\n$getVar[name;$authorID]\n\n$customEmoji[check] \`Age\`\n$replaceText[$replaceText[$checkCondition[$isNumber[$getVar[age;$authorID]]==true];true;$getVar[age;$authorID];1];false;Age not disclosed;1]\n\n$customEmoji[hi] \`Pet\`\n$getVar[pet;$authorID]\n\n$customEmoji[check] \`Country\`\n$getVar[country;$authorID]\n\n$customEmoji[ok] \`Hobbies\`\n$getVar[hobbies;$authorID]\n\n$customEmoji[admin] \`About\`\n$message}{thumbnail: $userAvatar[$authorID]} {color: BLUE};no]
$setVar[about;$message;$authorID]`
});


bot.status({

text: "ENJOY THE FUN OFFICIAL!",

type: "PLAYING",

time: 6

})

bot.status({
  text: "Jugando con kurumy",
  type: "PLAYING",
  time: 6
})

bot.status({

text: "Mi Prefix es $getServerVar[prefix]",

type: "WATCHING",

time: 6

})

bot.command({
 name: "status",
 code: `
$loop[999999999999;status]
$setServerVar[statusmsg;$splitText[1]]
$setServerVar[statusch;$channelID]
$textSplit[$sendMessage[Loading...;yes]; ]
$onlyForIDs[213834766137425920;]`
});
bot.awaitedCommand({
 name: "status",
 code: `$editMessage[$getServerVar[statusmsg];{title:Status:}{thumbnail:$userAvatar[$splitText[1]]}{color:$replaceText[$replaceText[$replaceText[$replaceText[$status[$splitText[1]];online;GREEN];offline;RED];idle;YELLOW];dnd;ORANGE]}{field:$username[$splitText[1]]:$replaceText[$replaceText[$replaceText[$replaceText[$status[$splitText[1]];offline;:red_circle: **\`Offline.\`**];online;:green_circle: **\`Online.\`**];dnd;:orange_circle: **\`Do not disturbe.\`**];idle;:yellow_circle: **\`Idle.\`**]:no}{field:Latency:\`$ping\`:yes}{field:RAM:\`$roundTenth[$ram;3]\`:yes}{field:CPU:\`$roundTenth[$ram;3]\`:yes}{field:Developers:***$userTag[$splitText[2]]*** **|** $replaceText[$replaceText[$replaceText[$replaceText[$status[$splitText[2]];offline;:red_circle: **\`Offline.\`**];online;:green_circle: **\`Online.\`**];dnd;:orange_circle: **\`Do not disturbe.\`**];idle;:yellow_circle: **\`Idle.\`**]}{footer:Status:$userAvatar[$splitText[1]]}{timestamp}{author:$userTag[$splitText[1]]:$userAvatar[$splitText[1]]};$getServerVar[statusch]]
$textSplit[828036092049489967,213834766137425920;,]
$wait[1m]`
})

bot.command({
 name: "$alwaysExecute",
 code: `$description[$useChannel[$getServerVar[rch]]
$replaceText[$replaceText[$replaceText[$replaceText[$getServerVar[rmsg];{user.tag};$userTag];{user.mention};<@$authorID>];{level};$getUserVar[lvl]];{exp};$getUserVar[exp]]
$setUserVar[lvl;$sum[$getUserVar[lvl];1]]
$setUserVar[rexp;$multi[$getUserVar[rexp];2]]
$onlyIf[$getUserVar[exp]>=$getUserVar[rexp];]
$onlyForServers[$guildID;]]` 
})
 
bot.command({
 name: "$alwaysExecute",
 code: `$setUserVar[exp;$sum[$getUserVar[exp];$random[1;4]]]
$onlyIf[$getServerVar[rsystem]>=1;]
$onlyForServers[$guildID;]`
})
 
bot.awaitedCommand({
 name: "errorrank",
 code: `$setServerVar[rch;]
$onlyForServers[$guildID;]`
})


//Read more information about status in docs:
//https://dbd.leref.ga/guide/bot-status

//variables

bot.variables({
    prefix: "h!", 
    welcomechannel: "",
    wmessage: "",
    leavechannel: "",
    lmessage: "",
    rch: "",
    rmsg: "Felicidades @<{user.tag}>, Usted acaba de subir a nivel {level} 🎉",
    exp: "",
    rexp: "40",
    rsystem: "0",
    lvl: "0",
    closed: "",
    news: "",
    Wallet: "0",
    XP: "",
    Bank: "",
    color: "RANDOM",
    verified: "",
    captcha: "",
    warn: "0",
    reason0:"",
    reason1:"",
    reason2:"",
    reason3:"",
    reason4:"",
    reason5:"",
    reason6:"",
    reason7:"",
    reason8:"",
    reason9:"",
    reason10:"",
    mute: "false",
    statusch: "",
    statusmsg: "",
    age:"",
    name:"",
    pet:"",
    country:"",
    hobbies:"",
    about:"",
    tpanel: "",
    tcategory: "",
    norma: "",
    
})

//You can add more variables :)
//Join our Support Server & read Documentation for help :)

const keepAlive = require('./server');
const Monitor = require('ping-monitor');

keepAlive();
const monitor = new Monitor({
 website: 'https://DBDjs.bellyoutube.repl.co',
 title: 'NAME',
 interval: 2 // minutes
});

monitor.on('up', (res) => console.log(`${res.website} está encedido.`));
monitor.on('down', (res) => console.log(`${res.website} se ha caído - ${res.statusMessage}`));
monitor.on('stop', (website) => console.log(`${website} se ha parado.`) );
monitor.on('error', (error) => console.log(error));
