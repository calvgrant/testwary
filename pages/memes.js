import clientPromise from '@/lib/mongodb';
import { useState } from 'react';
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
  const [search, setSearch] = useState('');
  const [visibleMemes, setVisibleMemes] = useState(memes);
  const [loading, setLoading] = useState(false);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const filterMemes = (memes) => {
    if (!search) return memes;
    return memes.filter(
      (meme) =>
        meme.uploader.toLowerCase().includes(search.toLowerCase()) ||
        meme.caption.toLowerCase().includes(search.toLowerCase())
    );
  };

  const loadMoreMemes = async () => {
    setLoading(true);
    const client = await clientPromise;
    const db = client.db();
    const newMemes = await db.collection('memes')
      .find({})
      .sort({ createdAt: -1 })
      .skip(visibleMemes.length)
      .limit(50)
      .toArray();
    
    setVisibleMemes((prevMemes) => [...prevMemes, ...newMemes]);
    setLoading(false);
  };

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

      {/* Search Bar */}
      <div className="mb-8 max-w-2xl mx-auto">
        <input
          type="text"
          placeholder="Cari meme berdasarkan uploader atau caption"
          value={search}
          onChange={handleSearch}
          className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
      </div>

      {/* Meme Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {filterMemes(visibleMemes).map((meme, i) => (
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

      {/* Load More Button */}
      <div className="text-center mt-8">
        <button
          onClick={loadMoreMemes}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 shadow-blue-500 shadow-lg"
          disabled={loading}
        >
          {loading ? 'Memuat lebih banyak...' : 'Muat Lebih Banyak'}
        </button>
      </div>

      {/* Upload Meme Button */}
      <div className="text-center mt-8">
        <a
          href="/upload"
          className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 shadow-purple-500 shadow-lg"
        >
          Upload Meme
        </a>
      </div>
    </main>
  );
}