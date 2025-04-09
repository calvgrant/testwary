import Head from 'next/head'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import InfoCards from '@/components/InfoCards.jsx'

export default function Home() {
  const [status, setStatus] = useState({ online: null, status: null });

  useEffect(() => {
    async function checkAPI() {
      try {
        const res = await fetch("/api/status");
        const data = await res.json();
        setStatus(data);
      } catch {
        setStatus({ online: false, status: "error" });
      }
    }

    checkAPI();
  }, []);

  return (
    <>
      <Head>
        <title>TwaryAPI - REST API</title>
        <meta name="description" content="API Publik gratis yang selalu online" />
      </Head>

      <main className="min-h-screen bg-black text-white px-6 py-10">
        <motion.h1
          className="text-4xl md:text-6xl font-bold text-center mb-8 text-blue-400"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Selamat Datang di TwaryAPI
        </motion.h1>

        <motion.p
          className="text-center max-w-2xl mx-auto text-gray-300 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          API publik gratis untuk berbagai kebutuhan aplikasi Anda. Cepat, handal, dan mudah digunakan.
        </motion.p>

        {/* STATUS API */}
        <motion.div
          className="text-center mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {status.online === null ? (
            <span className="text-gray-400 text-sm">Memeriksa status API...</span>
          ) : (
            <span
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium ${
                status.online
                  ? "bg-green-900 text-green-300 border border-green-600"
                  : "bg-red-900 text-red-300 border border-red-600"
              }`}
            >
              <span
                className={`w-2.5 h-2.5 rounded-full animate-pulse ${
                  status.online ? "bg-green-400" : "bg-red-400"
                }`}
              ></span>
              {status.online ? "API Status: Online" : "API Status: Offline"}
            </span>
          )}
        </motion.div>

        <div className="flex justify-center mt-6 gap-4">
          <motion.a
            href="/docs"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 shadow-blue-500 shadow-lg"
          >
            Lihat Dokumentasi
          </motion.a>
          <motion.a
            href="/tester"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 shadow-purple-500 shadow-lg"
          >
            Coba Tester API
          </motion.a>
        </div>

        <InfoCards />
      </main>
    </>
  );
}