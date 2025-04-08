const jokes = [
  "Kenapa ayam nyebrang jalan? Karena dia mau ke seberang.",
  "Kenapa programmer suka kopi? Karena tanpa kopi, mereka nggak bisa ngoding.",
  "Kenapa komputer stress? Karena terlalu banyak 'task'."
]

export default function handler(req, res) {
  const all = req.query.all === 'true' || req.url.includes('/all')
  if (all) return res.status(200).json(jokes)
  const count = parseInt(req.query.count) || 1
  const result = Array(count).fill(0).map(() => jokes[Math.floor(Math.random() * jokes.length)])
  res.status(200).json(count > 1 ? result : result[0])
}
