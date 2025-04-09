 import quotes from "@/data/quoteid.json"; // adjust path as needed

 export default function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*"); // <- tambahkan ini

  const count = parseInt(req.query.count) || 1;

  const result = Array(count)
    .fill(0)
    .map(() => {
      const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
      return {
        author: randomQuote.author,
        quotes: randomQuote.quotes,
      };
    });

  res.status(200).json(count > 1 ? result : result[0]);
}