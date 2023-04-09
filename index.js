const { token } = require('./config.json');
const { Client, IntentsBitField, ActivityType } = require('discord.js');

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

let status = [
  {
    name: 'Online for some reason',
    type: ActivityType.Streaming,
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  },
  {
    name: 'Online for some reason',
    type: ActivityType.Watching,
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  },
  {
    name: 'Online for some reason',
    type: ActivityType.Listening,
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  },
];

client.on('ready', (c) => {
  console.log(`${c.user.tag} is online.`);

  setInterval(() => {
    let random = Math.floor(Math.random() * status.length);
    client.user.setActivity(status[random]);
  }, 10000);
});

client.on('interactionCreate', (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'hi') {
    return interaction.reply('Hello there.');
  }

  if (interaction.commandName === 'ping') {
    return interaction.reply('pong');
  }

  if (interaction.commandName === 'pong') {
    return interaction.reply('ping');
  }
});

client.login(token);