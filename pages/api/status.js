// pages/api/status.js

const endpoints = [
  { name: "Gombal", path: "/api/gombal" },
  { name: "QuoteID", path: "/api/quoteid" },
  { name: "Jokereceh", path: "/api/jokesreceh" },
  { name: "Pap Kitsune", path: "/api/papkitsu" },
  // tambah lagi di sini sesuai kebutuhan
];

export default async function handler(req, res) {
  const baseUrl = process.env.TARGET_API_URL2;
  const results = [];

  for (const ep of endpoints) {
    const fullUrl = baseUrl + ep.path;
    try {
      const response = await fetch(fullUrl);
      const text = await response.text();

      const isError =
        response.status >= 400 ||
        text.toLowerCase().includes("not found") ||
        text.toLowerCase().includes("error") ||
        text.length < 10;

      results.push({
        name: ep.name,
        path: ep.path,
        online: !isError,
        status: response.status,
      });
    } catch (err) {
      results.push({
        name: ep.name,
        path: ep.path,
        online: false,
        status: "unreachable",
      });
    }
  }

  res.status(200).json({ endpoints: results });
}