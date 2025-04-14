import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function MemesPage() {
  const [memes, setMemes] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/memes')
      .then(res => res.json())
      .then(data => {
        setMemes(data);
        setLoading(false);
      });
  }, []);

  const filterMemes = (memes) => {
    if (!search) return memes;
    return memes.filter(
      (meme) =>
        meme.uploader?.toLowerCase().includes(search.toLowerCase()) ||
        meme.caption?.toLowerCase().includes(search.toLowerCase())
    );
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

      <div className="mb-8 max-w-2xl mx-auto">
        <input
          type="text"
          placeholder="Cari meme berdasarkan uploader atau caption"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
      </div>

      {loading ? (
        <p className="text-center text-gray-400">Memuat meme...</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {filterMemes(memes).map((meme, i) => (
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

          <div className="text-center mt-8">
            <a
              href="/uploadmeme"
              className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 shadow-purple-500 shadow-lg"
            >
              Upload Meme
            </a>
          </div>
        </>
      )}
    </main>
  );
}