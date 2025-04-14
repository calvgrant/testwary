import clientPromise from '@/lib/mongodb';
import { motion } from 'framer-motion';

export async function getServerSideProps() {
  const client = await clientPromise;
  const db = client.db();
  const memes = await db.collection('memes')
    .find({})
    .sort({ createdAt: -1 })
    .limit(50)
    .toArray();

  return {
    props: {
      memes: JSON.parse(JSON.stringify(memes))
    }
  };
}

export default function MemesPage({ memes }) {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-10">
      <motion.h1
        className="text-4xl md:text-5xl font-bold text-center text-pink-400 mb-10"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Galeri Meme Jomblo
      </motion.h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {memes.map((meme, i) => (
          <motion.div
            key={i}
            className="bg-gray-900 border border-gray-700 rounded-2xl p-4 shadow-md"
            whileHover={{ scale: 1.03 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03 }}
          >
            <img
              src={meme.url}
              alt="meme"
              className="rounded-xl mb-3 w-full object-cover max-h-64"
            />
            <p className="text-sm text-pink-300 font-semibold">{meme.uploader}</p>
            {meme.caption && <p className="text-sm text-gray-300">{meme.caption}</p>}
            <p className="text-xs text-gray-500 mt-1">
              {new Date(meme.createdAt).toLocaleString()}
            </p>
          </motion.div>
        ))}
      </div>
    </main>
  );
}