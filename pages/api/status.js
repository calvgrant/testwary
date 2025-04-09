// pages/api/status.js

export default async function handler(req, res) {
  const targetUrl = process.env.TARGET_API_URL;

  try {
    const response = await fetch(targetUrl);
    res.status(200).json({ online: response.ok, status: response.status });
  } catch {
    res.status(200).json({ online: false, status: "unreachable" });
  }
}