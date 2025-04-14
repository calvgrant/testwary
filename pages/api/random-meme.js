import clientPromise from '@/lib/mongodb';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const client = await clientPromise;
    const db = client.db();
    const memes = await db.collection('memes').find({}).toArray();

    if (memes.length === 0) {
      return res.status(404).json({ error: 'No memes found' });
    }

    // Get random meme
    const randomMeme = memes[Math.floor(Math.random() * memes.length)];

    res.status(200).json({ url: randomMeme.url, caption: randomMeme.caption });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}