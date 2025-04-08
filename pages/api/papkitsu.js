export default function handler(req, res) {
  const imgs = [
    "https://i.pinimg.com/originals/80/4e/7c/804e7c99074dfe62f2a6d92efacba0e8.jpg",
    "https://i.pinimg.com/originals/e0/31/cb/e031cb708e641f281655ad1de90d2aa0.jpg",
    "https://i.pinimg.com/originals/d6/90/90/d6909035e3c0a78c5fffc1a719ac0c6d.jpg"
  ]
  const count = parseInt(req.query.count) || 1
  const result = Array(count).fill(0).map(() => imgs[Math.floor(Math.random() * imgs.length)])
  res.status(200).json(count > 1 ? result : result[0])
}
