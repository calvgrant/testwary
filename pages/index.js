import { motion } from 'framer-motion'
import Link from 'next/link'

export default function Home() {
  return (
    <motion.main
      className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-900 text-white p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <h1 className="text-4xl font-bold mb-4">TwaryAPI</h1>
      <p className="mb-6 text-lg">API publik gratis untuk quote, gombalan, papkitsu, dan joke receh.</p>
      <div className="space-x-4">
        <Link href="/docs" className="bg-blue-700 hover:bg-blue-600 px-4 py-2 rounded-lg font-semibold">
          Dokumentasi
        </Link>
        <Link href="/tester" className="bg-white text-black hover:bg-gray-200 px-4 py-2 rounded-lg font-semibold">
          Coba API
        </Link>
      </div>
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-2">Hubungi Saya</h2>
        <div className="space-x-4">
          <a href="https://github.com/yourusername" target="_blank" className="underline text-blue-400">GitHub</a>
          <a href="https://discord.com/users/yourdiscordid" target="_blank" className="underline text-blue-400">Discord</a>
        </div>
      </div>
    </motion.main>
  )
}
