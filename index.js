const Discord = require("discord.js");
const client = new Discord.Client();
const credentials = require("./credentials.json");
const announcements = require("./announcements");

const broadcasts = announcements.announcements;
var day = new Date();
var hour = day.getHours();
let dingedMembers = [];
let speechChannel = credentials.speechChannelId;
let announcementsCounter = Math.floor(
  Math.random() * Math.floor(broadcasts.length)
);
let membersCounter = Math.floor(Math.random() * Math.floor(broadcasts.length));

const fetchRandomMember = async () => {
  let memberCount = client.guilds.get(credentials.guildId).memberCount;

  announcementsCounter++;
  if (announcementsCounter > broadcasts.length) announcementsCounter = 0;

  membersCounter++;
  if (membersCounter > memberCount) membersCounter = 0;

  // console.log("Fetching random user");
  // console.log("Member count: ", memberCount);
  // console.log(announcements.announcements[1]);
  try {
    members = await client.guilds
      .get(credentials.guildId)
      .members.map(member => member);
    console.log(members[announcementsCounter].user);
  } catch (error) {
    console.log("I fucked up getting a random user!", error);
  }

  if (dingedMembers.length === memberCount) dingedMembers = [];

  // dingedMembers.includes(randomMember) //random member in the previously dinged array?
  //   ? fetchRandomMember()               //run the randomMember function again
  //   : dingedMembers.push(randomMember); //else add the member to the array

  // client.channels
  //   .get("498998479562211348")
  //   .send(`test ${randomMember} ${announcementsCounter}`);
  console.log(`${randomMember.username} ${broadcasts[announcementsCounter]} `);
  // console.log("randomMember: ", randomMember);
  // console.log("dingedMembers: ", dingedMembers);
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
