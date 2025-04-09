import quotes from "@/data/quoteid.json"; // Pastikan file JSON berisi array objek dengan "author" dan "quotes"

export default function handler(req, res) {
  const count = parseInt(req.query.count) || 1;

  const randomQuote = () => {
    const item = quotes[Math.floor(Math.random() * quotes.length)];
    return {
      quotes: item.quotes,
      author: item.author
    };
  };

  const response = {
    status: 200,
    end_point: "/api/quoteid",
    method: "GET",
    data: count > 1 ? Array(count).fill(0).map(randomQuote) : randomQuote()
  };

  res.status(200).json(response);
}