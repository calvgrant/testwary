// pages/api/uptime.js

export default async function handler(req, res) {
  const targetUrl = process.env.TARGET_API_URL;
  const discordWebhook = process.env.DISCORD_WEBHOOK_URL;

  try {
    const response = await fetch(targetUrl);

    if (!response.ok) {
      await sendDiscordAlert(`API is DOWN! Status: ${response.status}`);
    }

    res.status(200).json({ message: "Uptime checked", status: response.status });
  } catch (error) {
    await sendDiscordAlert(`API is UNREACHABLE! Error: ${error.message}`);
    res.status(500).json({ message: "Check failed", error: error.message });
  }

  async function sendDiscordAlert(message) {
    if (!discordWebhook) return;
    await fetch(discordWebhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        embeds: [
          {
            title: "API Uptime Alert",
            description: message,
            color: 0xff0000,
            timestamp: new Date().toISOString(),
          },
        ],
      }),
    });
  }
}