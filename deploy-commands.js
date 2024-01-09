require('dotenv').config();
const { REST, Routes } = require('discord.js');

const commands = [
  {
    name: 'hi',
    description: 'Hello there.',
  },
  {
    name: 'ping',
    description: 'Pong',
  },
  {
    name: 'pong',
    description: 'Ping',
  },
  {
    name: 'selfie',
    description: 'Sends AI selfie',
  },
  {
    name: 'status',
    description: 'Returns bot status',
  },
  {
    name: 'repeat',
    description: 'Repeats the message',
    options: [
      {
        name: 'message',
        description: 'The message to repeat',
        type: 3,
        required: true,
      },
    ],
  },
  {
    name: 'reference',
    description: 'Get reference images for your artwork',
    options: [
      {
        name: 'category',
        description: 'Select a category',
        type: 3,
        required: true,
        choices: [
          {
            name: 'Animals',
            value: 'animals',
          },
          {
            name: 'Full Body',
            value: 'fullbody',
          },
          {
            name: 'Hands',
            value: 'hands',
          },
          {
            name: 'Portraits',
            value: 'portraits',
          },
          {
            name: 'Structures',
            value: 'structures',
          },
          {
            name: 'Vegetation',
            value: 'vegetation',
          },
        ],
      },
    ],
  },
  {
    name: 'clirun',
    description: 'Runs the command and returns the output',
    options: [
      {
        name: 'command',
        description: 'Command to run',
        type: 3,
        required: true,
      },
    ],
  },
  {
    name: 'fetch',
    description: 'Sends the desired file',
    options: [
      {
        name: 'filename',
        description: 'Name of the file to send',
        type: 3,
        required: true,
      },
    ],
  },
  {
    name: 'createtxt',
    description: 'Creates txt file on server',
    options: [
      {
        name: 'filename',
        description: 'Name of the file',
        type: 3,
        required: true,
      },
      {
        name: 'text',
        description: 'Text to be in the text file',
        type: 3,
        required: true,
      },
    ],
  },
  {
    name: 'roll',
    description: 'Roll a D&D dice',
    options: [
      {
        name: 'firstnum',
        description: 'minimum value',
        type: 3,
        required: true,
      },
      {
        name: 'secondnum',
        description: 'maximum value',
        type: 3,
        required: true,
      },
    ],
  },
];

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log('Registering slash commands...');

    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID
      ),
      { body: commands }
    );

    console.log('Slash commands were registered successfully!');
  } catch (error) {
    console.log(`There was an error: ${error}`);
  }
})();