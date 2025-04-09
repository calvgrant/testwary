// pages/api/check.js

import axios from 'axios';

const DISCORD_WEBHOOK = process.env.WEBDC;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { apis } = req.body;
  const statuses = {};

  for (const api of apis) {
    try {
      const response = await axios.get(api.url);
      statuses[api.url] = response.status === 200 ? 'Online' : 'Offline';
    } catch (error) {
      statuses[api.url] = 'Offline';

      if (DISCORD_WEBHOOK) {
        await axios.post(DISCORD_WEBHOOK, {
          content: `**ALERT:** API \`${api.name}\` (${api.url}) sedang DOWN!`,
        });
      }
    }
  }

  res.status(200).json({ statuses });
}