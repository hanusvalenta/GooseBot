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
    name: 'Money Heist',
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

client.on('interactionCreate', async (interaction) => {
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
    const fs = require('fs');
    const path = require('path');

    const selfieDir = path.join(__dirname, 'Selfies');
    const selfieFiles = fs.readdirSync(selfieDir);
    const selfieIndex = Math.floor(Math.random() * selfieFiles.length);
    const selfieFile = path.join(selfieDir, selfieFiles[selfieIndex]);

    const embed = new EmbedBuilder()
      .setTitle('Enjoy your selfie')
      .setDescription(`Done by ${client.user.tag}. Spreading is punishable...`)
      .setColor('ffffff')
      .setImage(`attachment://${selfieFiles[selfieIndex]}`)
      ;

    interaction.reply({ embeds: [embed], files: [selfieFile] });
  }

  if (interaction.commandName === 'status') {
    const ping = Math.round(interaction.client.ws.ping);

    return interaction.reply(`I'm ${client.user.tag} and my ping is ${ping}ms.`);
  }

  if (interaction.commandName === 'repeat') {
    const message = interaction.options.getString('message');
    await interaction.reply(message);
  }

  if (interaction.commandName === 'reference') {
    const fs = require('fs');
    const path = require('path');
    const { options } = interaction;
    const option = options.getString('category');
  
    if (!option) {
      return interaction.reply('Please provide a category for the reference!');
    }
  
    const categoryDir = path.join(__dirname, 'Reference', option.toLowerCase());
    const categoryFiles = fs.readdirSync(categoryDir).filter(file => file.endsWith('.jpg'));
    const categoryIndex = Math.floor(Math.random() * categoryFiles.length);
    const categoryFile = path.join(categoryDir, categoryFiles[categoryIndex]);
  
    const embed = new EmbedBuilder()
      .setTitle(`Enjoy your ${option.toLowerCase()} reference`)
      .setDescription(`Done by ${client.user.tag}. Spreading is punishable...`)
      .setColor('ffffff')
      .setImage(`attachment://${categoryFiles[categoryIndex]}`);
  
    interaction.reply({ embeds: [embed], files: [categoryFile] });
  }       
});

client.login(token);