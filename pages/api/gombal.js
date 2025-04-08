export default function handler(req, res) {
  const data = [
    "Kamu tahu nggak bedanya kamu sama bintang? Bintang di langit, kalau kamu di hati aku.",
    "Kalau aku jadi matematika, kamu jadi integralnya, karena kamu melengkapi semuanya.",
    "Cintaku ke kamu tuh kayak limit tak hingga, nggak ada habisnya."
  ]
  const count = parseInt(req.query.count) || 1
  const result = Array(count).fill(0).map(() => data[Math.floor(Math.random() * data.length)])
  res.status(200).json(count > 1 ? result : result[0])
}
