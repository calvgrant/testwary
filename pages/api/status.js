// pages/api/status.js
export default function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Content-Type", "application/json");

  const response = {
    status: 200,
    end_point: "/api/status",
    method: "GET",
    data: {
      status: "ok",
      version: "1.0.0",
      uptime: process.uptime(), // waktu hidup server (detik)
      timestamp: new Date().toISOString(),
      env: process.env.NODE_ENV || "development",
    },
  };

  const prettyJson = JSON.stringify(response, null, 2);
  res.status(200).end(prettyJson);
}