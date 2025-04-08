import Head from 'next/head'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiSend } from 'react-icons/fi'

export default function Tester() {
  const [url, setUrl] = useState('')
  const [response, setResponse] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleTest = async () => {
    if (!url.startsWith('https://testwary.vercel.app/api/')) {
      setResponse('Hanya URL TwaryAPI yang diizinkan.')
      return
    }

    setLoading(true)
    try {
      const res = await fetch(url)
      const data = await res.json()
      setResponse(JSON.stringify(data, null, 2))
    } catch (error) {
      setResponse('Gagal mengambil data. Pastikan URL valid.')
    }
    setLoading(false)
  }

  return (
    <>
      <Head>
        <title>Tester API - TwaryAPI</title>
      </Head>

      <main className="min-h-screen bg-black text-white px-6 py-12">
        <motion.h1
          className="text-3xl md:text-5xl font-bold text-center text-blue-400 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Coba Endpoint API
        </motion.h1>

        <div className="max-w-2xl mx-auto">
          <div className="flex gap-2 mb-6">
            <input
              type="text"
              placeholder="Masukkan URL API..."
              className="flex-1 bg-gray-800 text-white p-3 rounded-xl border border-gray-700 outline-none"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <motion.button
              onClick={handleTest}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-3 rounded-xl shadow-lg font-semibold transition-all"
            >
              {loading ? 'Memuat...' : <>
                <FiSend /> Coba
              </>}
            </motion.button>
          </div>

          {response && (
            <motion.pre
              className="bg-gray-900 p-4 rounded-xl text-sm overflow-auto border border-gray-700 text-green-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {response}
            </motion.pre>
          )}
        </div>
      </main>
    </>
  )
}