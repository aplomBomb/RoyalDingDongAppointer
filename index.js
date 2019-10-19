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

const fetchRandomMember = async () => {
  try {
    client.guilds
      .get(credentials.guildId)
      .roles.get(roleId)
      .members.forEach(member => {
        member.removeRole(roleId);
      });
  } catch (error) {
    console.log(error);
  }

  let memberCount = client.guilds.get(credentials.guildId).memberCount;
  // console.log("CurrentDingDong: ", currentDingDong);

  announcementsCounter++;
  if (announcementsCounter > broadcasts.length) announcementsCounter = 0;

  membersCounter++;
  if (membersCounter > memberCount) membersCounter = 0;

  try {
    members = await client.guilds
      .get(credentials.guildId)
      .members.map(member => member);
    // console.log(members[announcementsCounter].user);
  } catch (error) {
    console.log("I fucked up getting a random user!", error);
  }

  if (dingedMembers.length === memberCount) dingedMembers = [];

  // dingedMembers.includes(randomMember) //random member in the previously dinged array?
  //   ? fetchRandomMember()               //run the randomMember function again
  //   : dingedMembers.push(randomMember); //else add the member to the array

  // console.log(
  //   `${members[membersCounter]} ${broadcasts[announcementsCounter]} `
  // );
  // console.log(`MembersCounter: `, membersCounter);
  // console.log(`AnnouncementsCounter: `, announcementsCounter);

  // client.channels
  //   .get(credentials.speechChannelId)
  //   .send(`${members[membersCounter]} ${broadcasts[announcementsCounter]}`);

  // console.log(client.guilds(credentials.guildId).members.)
};

client.on("ready", () => {
  console.log(`${client.user.tag} logged in, all systems go!`);

  setInterval(fetchRandomMember, 5000);
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
