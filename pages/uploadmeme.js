import { useState } from 'react';
import { motion } from 'framer-motion';
import Head from 'next/head';

export default function UploadMeme() {
  const [url, setUrl] = useState('');
  const [caption, setCaption] = useState('');
  const [uploader, setUploader] = useState('');
  const [status, setStatus] = useState('');
  const [showPreview, setShowPreview] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Uploading...');

    const res = await fetch('/api/upload-meme', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url, caption, uploader }),
    });

    const data = await res.json();
    if (res.ok) {
      setStatus('Meme uploaded! ID: ' + data.id);
      setUrl('');
      setCaption('');
      setUploader('');
      setShowPreview(false);
    } else {
      setStatus('Error: ' + data.error);
    }
  };

  const handleUrlChange = (e) => {
    const value = e.target.value;
    setUrl(value);
    // Tampilkan preview hanya jika URL tampak seperti gambar
    setShowPreview(/^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i.test(value));
  };

  return (
    <>
      <Head>
        <title>Upload Meme - TwaryAPI</title>
      </Head>

      <main className="min-h-screen bg-black text-white px-6 py-10 flex items-center justify-center">
        <motion.div
          className="bg-gray-900 w-full max-w-xl p-8 rounded-2xl shadow-lg border border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h1
            className="text-3xl font-bold mb-6 text-center text-purple-400"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Upload Meme Lucu
          </motion.h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="URL Gambar"
              value={url}
              onChange={handleUrlChange}
              className="w-full px-4 py-3 rounded-xl bg-gray-800 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
            <input
              type="text"
              placeholder="Caption (opsional)"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-gray-800 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <input
              type="text"
              placeholder="Nama Pengunggah"
              value={uploader}
              onChange={(e) => setUploader(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-gray-800 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-purple-600 hover:bg-purple-700 transition-all duration-200 text-white font-semibold py-3 rounded-xl shadow-md"
            >
              Upload Sekarang
            </motion.button>
          </form>

          {showPreview && (
            <motion.div
              className="mt-6 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <p className="text-sm text-gray-400 mb-2">Preview Gambar:</p>
              <img
                src={url}
                alt="Preview Meme"
                className="rounded-xl max-h-96 mx-auto border border-gray-600 shadow-md"
              />
            </motion.div>
          )}

          {status && (
            <motion.p
              className="mt-4 text-center text-sm text-gray-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {status}
            </motion.p>
          )}
        </motion.div>
      </main>
    </>
  );
}