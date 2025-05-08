// pages/privacy-policy.jsx
import Head from 'next/head'
import { motion } from 'framer-motion'

export default function PrivacyPolicy() {
  return (
    <>
      <Head>
        <title>Privacy Policy - Danilxlo</title>
        <meta name="description" content="Kebijakan privasi resmi untuk bot Discord Danilxlo." />
      </Head>

      <main className="min-h-screen bg-black text-white px-6 py-12">
        <motion.h1
          className="text-4xl md:text-6xl font-bold text-center mb-8 text-blue-400"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Privacy Policy
        </motion.h1>

        <motion.div
          className="max-w-3xl mx-auto text-gray-300 space-y-6 text-base md:text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <section>
            <h2 className="text-xl text-purple-400 font-semibold mb-2">1. Data We Collect</h2>
            <p>
              Danilxlo may collect:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Discord user IDs</li>
              <li>Server IDs and server-specific settings</li>
              <li>Custom role data (name, color, etc.)</li>
              <li>Command usage (non-sensitive)</li>
            </ul>
            <p className="mt-2">
              We do <strong className="text-white">not</strong> collect DMs, sensitive data, or IP addresses.
            </p>
          </section>

          <section>
            <h2 className="text-xl text-purple-400 font-semibold mb-2">2. How We Use Data</h2>
            <p>
              Data is used solely to power bot features, improve performance, and provide a personalized experience per server.
            </p>
          </section>

          <section>
            <h2 className="text-xl text-purple-400 font-semibold mb-2">3. Data Sharing</h2>
            <p>
              Your data is <strong className="text-white">never shared</strong> with third parties. Only the developer has access for maintenance and support.
            </p>
          </section>

          <section>
            <h2 className="text-xl text-purple-400 font-semibold mb-2">4. Data Retention</h2>
            <p>
              Data is stored as long as the bot remains in a server. Upon removal, data may be deleted after a grace period.
            </p>
          </section>

          <section>
            <h2 className="text-xl text-purple-400 font-semibold mb-2">5. Your Rights</h2>
            <p>
              You may request data deletion at any time by contacting:
            </p>
            <ul className="list-inside list-disc mt-2 space-y-1">
              <li><strong>Email:</strong> zarconxorp@gmail.com</li>
              <li><strong>Discord:</strong> Noctusvan</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl text-purple-400 font-semibold mb-2">6. Changes</h2>
            <p>
              This policy may be updated. Major changes will be announced via official channels.
            </p>
          </section>

          <div className="text-center mt-10">
            <motion.a
              href="/"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 shadow-blue-500 shadow-lg"
            >
              Kembali ke Beranda
            </motion.a>
          </div>
        </motion.div>
      </main>
    </>
  )
}