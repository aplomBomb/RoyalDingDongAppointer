const Discord = require("discord.js");
const client = new Discord.Client();
const credentials = require("./credentials.json");

var day = new Date();
var hour = day.getHours();
let dingedMembers = [];

const checkForTime = () => {
  if (hour === 8) {
    console.log(n);
    return true;
  } else return false;
};

const fetchRandomMember = async () => {
  let memberCount = client.guilds.get(credentials.guildId).memberCount;
  console.log("Fetching random user");
  console.log("Member count: ", memberCount);

  try {
    randomMember = await client.guilds.get(credentials.guildId).members.random()
      .user.username;
  } catch (error) {
    console.log("I fucked up getting a random user!", error);
  }

  if (dingedMembers.length === memberCount) dingedMembers = [];

  dingedMembers.includes(randomMember) //random member in the previously dinged array?
    ? fetchRandomMember() //run the randomMember function again
    : dingedMembers.push(randomMember); //else add the member to the array

  console.log("randomMember: ", randomMember);
  console.log("dingedMembers: ", dingedMembers);
  return randomMember;
};

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);

  // console.log(client.guilds);

  setInterval(fetchRandomMember, 2000);
});

client.on("message", message => {
  (async () => {
    const prefix = "//";

    const args = message.content
      .slice(prefix.length)
      .trim()
      .split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if (message.author.bot) return;
    if (!message.guild) return;
    if (message.content.includes("525382819808280597")) {
      console.log("Someone is mentioning cobugbot");
      message
        .react("🇸")
        .then(() => message.react("🇹"))
        .then(() => message.react("🇫"))
        .then(() => message.react("🇺"))
        .catch(() => {
          console.log("Failed to react with emoji");
        });
    }
    if (cmd === "refresh") {
      if (message.deletable) message.delete();
      message.channel.send();
      randomMember = await client.guilds
        .get("471689270399336448")
        .members.random().user.id;

      console.log("Online members: ", members);
      console.log(message.guild.id);
    }
  })().catch(console.log);
});

client.login(credentials.token);
