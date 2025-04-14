import clientPromise from '@/lib/mongodb';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { url, caption, uploader } = req.body;
  if (!url || !uploader) {
    return res.status(400).json({ error: 'Missing data' });
  }

  try {
    const client = await clientPromise;
    const db = client.db(); // default DB name from connection string
    const collection = db.collection('memes');

    const result = await collection.insertOne({
      url,
      caption,
      uploader,
      createdAt: new Date()
    });

    res.status(200).json({ message: 'Meme saved!', id: result.insertedId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}