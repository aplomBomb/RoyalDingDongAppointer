const Discord = require("discord.js");
const client = new Discord.Client();
const credentials = require("./credentials.json");
const announcements = require("./announcements");

const broadcasts = announcements.announcements;
let dingedMembers = [];
let speechChannel = credentials.speechChannelId;
let announcementsCounter = Math.floor(
  Math.random() * Math.floor(broadcasts.length)
);
let membersCounter = Math.floor(Math.random() * Math.floor(broadcasts.length));

const roleId = "484838319117565952";
const ditcherRole = "638523173024956426";

const fetchRandomMember = async () => {
  let lastDingMessage = await speechChannel
    .fetchMessages({ limit: 1 })
    .then(messages => {
      return messages.first();
    });

  let currentDingDongs = await client.guilds
    .get(credentials.guildId)
    .roles.get(roleId).members;

  if (lastDingMessage.author.bot) {
    currentDingDongs.forEach(member => {
      member.addRole(ditcherRole);
    });
  }

  try {
    currentDingDongs.forEach(member => {
      member.removeRole(roleId);
    });
  } catch (error) {
    console.log(error);
  }

  let memberCount = client.guilds.get(credentials.guildId).memberCount; //get the total number of server members

  announcementsCounter++;
  if (announcementsCounter > broadcasts.length) announcementsCounter = 0;

  membersCounter++;
  if (membersCounter > memberCount) membersCounter = 0;

  try {
    members = await client.guilds
      .get(credentials.guildId)
      .members.map(member => member);
  } catch (error) {
    console.log("I fucked up getting a random user!", error);
  }

  try {
    members[membersCounter].addRole(roleId);
    console.log(`Making ${members[membersCounter]} DingDong of the day!`);
  } catch (error) {
    console.log("Trying to add dingDong role", error);
  }

  if (dingedMembers.length === memberCount) dingedMembers = [];

  client.channels
    .get(credentials.speechChannelId)
    .send(`${members[membersCounter]} ${broadcasts[announcementsCounter]}`);
};

client.on("ready", () => {
  console.log(`${client.user.tag} logged in, all systems go!`);

  setInterval(fetchRandomMember, 86400000); //run once every 24 hours
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
  })().catch(console.log);
});

client.login(credentials.token);
