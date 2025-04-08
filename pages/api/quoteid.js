export default function handler(req, res) {
  const quotes = [
    "Jangan pernah menyerah, karena kamu lebih kuat dari yang kamu pikirkan.",
    "Hidup itu seperti sepeda, agar seimbang kamu harus terus bergerak.",
    "Semangat itu bukan datang dari motivasi, tapi dari kebiasaan menang."
  ]
  const count = parseInt(req.query.count) || 1
  const result = Array(count).fill(0).map(() => quotes[Math.floor(Math.random() * quotes.length)])
  res.status(200).json(count > 1 ? result : result[0])
}
