import imgs from "@/data/papkitsu.json"; // adjust path as needed

export default function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Content-Type", "application/json");

  const count = parseInt(req.query.count) || 1;

  const getRandomImage = () => ({
    image_url: imgs[Math.floor(Math.random() * imgs.length)],
  });

  const data = count > 1
    ? Array(count).fill(0).map(getRandomImage)
    : getRandomImage();

  const response = {
    status: 200,
    end_point: "/api/papkitsu",
    method: "GET",
    data,
  };

  const prettyJson = JSON.stringify(response, null, 2);
  res.status(200).end(prettyJson);
}