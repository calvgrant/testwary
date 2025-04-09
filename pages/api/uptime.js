 // pages/api/uptime.js

export default async function handler(req, res) {
  const targetUrl = process.env.TARGET_API_URL2;
  const discordWebhook = process.env.DISCORD_WEBHOOK_URL;

  const forceDown = req.query.forceDown === 'true';

  if (forceDown) {
    await sendDiscordAlert('API is DOWN! (Simulated with ?forceDown=true)');
    return res.status(503).json({ message: 'Simulated down', online: false });
  }

  try {
    const response = await fetch(targetUrl);
    const text = await response.text();

    const isError =
      response.status >= 400 ||
      text.toLowerCase().includes("not found") ||
      text.toLowerCase().includes("vercel 404") ||
      text.length < 10;

    if (isError) {
      await sendDiscordAlert(`API is DOWN! Status: ${response.status} - ${text.slice(0, 100)}...`);
    }

    res.status(200).json({
      message: "Uptime checked",
      status: response.status,
      online: !isError,
    });
  } catch (error) {
    await sendDiscordAlert(`API is UNREACHABLE! Error: ${error.message}`);
    res.status(500).json({ message: "Check failed", error: error.message, online: false });
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