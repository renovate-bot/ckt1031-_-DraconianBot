import axios from 'axios';
import { EmbedBuilder } from 'discord.js';

import type { TextCommand } from '../../../sturctures/command';

export const command: TextCommand = {
  data: {
    name: 'dog',
    description: 'Fetch dog image.',
    directMessageAllowed: true,
    cooldownInterval: 6 * 1000,
  },
  run: async ({ message }) => {
    const embed = new EmbedBuilder();

    try {
      const url = 'https://dog.ceo/api/breeds/image/random';

      const response = await axios.get(url);
      const responseData: {
        status: string;
        message: string;
      } = response.data;

      if (responseData.status !== 'success') throw 0;

      embed.setTitle('Dog here').setImage(responseData.message);

      message.reply({
        embeds: [embed],
      });
    } catch {
      embed.setDescription('Error occured when fetching meme content.');

      message.reply({
        embeds: [embed],
      });
    }
  },
};
