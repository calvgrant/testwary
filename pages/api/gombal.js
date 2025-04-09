import imgs from "@/data/gombal.json"; // adjust path as needed

export default function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Content-Type", "application/json");

  const count = parseInt(req.query.count) || 1;

  const getRandomGombal = () => ({
    gombal_wrd: imgs[Math.floor(Math.random() * imgs.length)],
  });

  const data = count > 1
    ? Array(count).fill(0).map(getRandomGombal)
    : getRandomGombal();

  const response = {
    status: 200,
    end_point: "/api/gombal",
    method: "GET",
    data
  };

  const prettyJson = JSON.stringify(response, null, 2);
  res.status(200).end(prettyJson);
}