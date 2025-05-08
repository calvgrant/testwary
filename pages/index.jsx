import Head from 'next/head'
import { motion } from 'framer-motion'
import { FaShieldAlt, FaScroll, FaDiscord } from 'react-icons/fa'
import { useEffect, useState } from 'react'
import InfoCards from '@/components/InfoCards.jsx'

export default function Home() {
  const [endpoints, setEndpoints] = useState(null);

  useEffect(() => {
    async function fetchStatus() {
      try {
        const res = await fetch("/api/status");
        const data = await res.json();
        setEndpoints(data.endpoints);
      } catch {
        setEndpoints([]);
      }
    }

    fetchStatus();
  }, []);

  const onlineEndpoints = endpoints?.filter((ep) => ep.online) || [];
  const offlineEndpoints = endpoints?.filter((ep) => !ep.online) || [];

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
          API publik gratis yang dibuat dengan penuh semangat.
        </motion.p>

        {/* STATUS API */}
        <motion.div
          className="text-center mt-4 space-y-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {endpoints === null ? (
            <span className="text-gray-400 text-sm">Memeriksa status endpoint...</span>
          ) : (
            <>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-green-900 text-green-300 border border-green-600">
                <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse"></span>
                {onlineEndpoints.length} Endpoint Online
              </span>

              {offlineEndpoints.length > 0 && (
                <div className="space-y-1">
                  <h3 className="text-red-300 font-semibold text-sm">Endpoint Offline:</h3>
                  <ul className="space-y-1">
                    {offlineEndpoints.map((ep) => (
                      <li
                        key={ep.path}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-900 text-red-300 border border-red-600 text-sm"
                      >
                        <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse"></span>
                        {ep.name} ({ep.status})
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
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

        {/* FOOTER LINKS */}
        <motion.div
          className="mt-12 flex flex-col md:flex-row justify-center items-center gap-4 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <a
            href="/privacy-policy"
            className="inline-flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white text-sm font-medium px-4 py-2 rounded-xl transition-all duration-200"
          >
            <FaShieldAlt className="text-blue-400" />
            Privacy Policy
          </a>

          <a
            href="/terms-of-service"
            className="inline-flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white text-sm font-medium px-4 py-2 rounded-xl transition-all duration-200"
          >
            <FaScroll className="text-purple-400" />
            Terms of Service
          </a>

          <a
            href="https://discord.com/oauth2/authorize?client_id=YOUR_CLIENT_ID&scope=bot+applications.commands&permissions=8"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white font-semibold px-4 py-2 rounded-xl transition-all duration-200 shadow-green-600 shadow-lg"
          >
            <FaDiscord />
            Invite Danilxlo
          </a>
        </motion.div>
      </main>
    </>
  );
}