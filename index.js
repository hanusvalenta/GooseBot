const { token } = require('./config.json');
const { Client, IntentsBitField } = require('discord.js');

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

client.on('ready', (c) => {
  console.log(`${c.user.tag} is online.`);
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