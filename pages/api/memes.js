import clientPromise from '@/lib/mongodb';

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db();
  const memes = await db.collection('memes')
    .find({})
    .sort({ createdAt: -1 })
    .limit(50)
    .toArray();

  res.status(200).json(JSON.parse(JSON.stringify(memes)));
}