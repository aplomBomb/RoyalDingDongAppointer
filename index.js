const Discord = require("discord.js");
const client = new Discord.Client();
const credentials = require("./credentials.json");
const announcements = require("./announcements");

var day = new Date();
var hour = day.getHours();
let dingedMembers = [];
let speechChannel = credentials.speechChannelId;
let announcementsCounter = Math.floor(
  Math.random() * Math.floor(announcements.announcements.length)
);

const fetchRandomMember = async () => {
  announcementsCounter++;
  if (announcementsCounter === announcements.length) announcementsCounter = 1;
  let memberCount = client.guilds.get(credentials.guildId).memberCount;
  // console.log("Fetching random user");
  // console.log("Member count: ", memberCount);
  // console.log(announcements.announcements[1]);
  try {
    randomMember = await client.guilds.get(credentials.guildId).members.random()
      .user;
  } catch (error) {
    console.log("I fucked up getting a random user!", error);
  }

  if (dingedMembers.length === memberCount) dingedMembers = [];

  dingedMembers.includes(randomMember) //random member in the previously dinged array?
    ? fetchRandomMember() //run the randomMember function again
    : dingedMembers.push(randomMember); //else add the member to the array

  client.channels
    .get("498998479562211348")
    .send(`test ${randomMember} ${announcementsCounter}`);

  // console.log("randomMember: ", randomMember);
  // console.log("dingedMembers: ", dingedMembers);
  return randomMember;
};

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);

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
    if (message.content.includes(credentials.cobugbotId)) {
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
    }
  })().catch(console.log);
});

client.login(credentials.token);
