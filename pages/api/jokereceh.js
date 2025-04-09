import imgs from "@/data/jokereceh.json"; // adjust path as needed

export default function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Content-Type", "application/json");

  const count = parseInt(req.query.count) || 1;

  const getRandomJoke = () => ({
    jokerecehl: imgs[Math.floor(Math.random() * imgs.length)],
  });

  const data = count > 1
    ? Array(count).fill(0).map(getRandomJoke)
    : getRandomJoke();

  const response = {
    status: 200,
    end_point: "/api/jokereceh",
    method: "GET",
    data,
  };

  const prettyJson = JSON.stringify(response, null, 2);
  res.status(200).end(prettyJson);
}