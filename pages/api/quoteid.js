import quotes from "@/data/quoteid.json"; // adjust path as needed

export default function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Content-Type", "application/json");

  const count = parseInt(req.query.count) || 1;

  const getRandomQuote = () => {
    const random = quotes[Math.floor(Math.random() * quotes.length)];
    return {
      author: random.author,
      quotes: random.quotes,
    };
  };

  const data = count > 1
    ? Array(count).fill(0).map(getRandomQuote)
    : getRandomQuote();

  const response = {
    status: 200,
    end_point: "/api/quoteid",
    method: "GET",
    data,
  };

  const prettyJson = JSON.stringify(response, null, 2);
  res.status(200).end(prettyJson);
}