import imgs from "@/data/papkitsu.json"; // adjust path as needed

export default function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  
  const count = parseInt(req.query.count) || 1;

  const result = Array(count)
    .fill(0)
    .map(() => ({
      image_url: imgs[Math.floor(Math.random() * imgs.length)],
    }));

  res.status(200).json(count > 1 ? result : result[0]);
}