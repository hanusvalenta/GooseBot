const { token } = require('./config.json');
const { Client, IntentsBitField, ActivityType, EmbedBuilder } = require('discord.js');

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
    name: 'Valorant',
    type: ActivityType.Streaming,
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  },
  {
    name: 'LACKADAISY',
    type: ActivityType.Watching,
  },
  {
    name: 'AnotherFunnyNickname#0262',
    type: ActivityType.Listening,
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
  if (interaction.commandName === 'hi') {
    return interaction.reply('Hello there.');
  }

  if (interaction.commandName === 'ping') {
    return interaction.reply('pong');
  }

  if (interaction.commandName === 'pong') {
    return interaction.reply('ping');
  }

  if (interaction.commandName === 'selfie') {
    const embed = new EmbedBuilder()
      .setTitle('Embed title')
      .setDescription('Enjoy your selfie')
      .setColor('ffffff')
      .setImage('selfie.jpeg')
      ;

    interaction.reply({ embeds: [embed] });
  }
});

client.login(token);