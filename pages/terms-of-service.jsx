// pages/terms-of-service.jsx
import Head from 'next/head'
import { motion } from 'framer-motion'

export default function TermsOfService() {
  return (
    <>
      <Head>
        <title>Terms of Service - Danilxlo</title>
        <meta name="description" content="Syarat dan Ketentuan penggunaan bot Discord Danilxlo." />
      </Head>

      <main className="min-h-screen bg-black text-white px-6 py-12">
        <motion.h1
          className="text-4xl md:text-6xl font-bold text-center mb-8 text-blue-400"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Terms of Service
        </motion.h1>

        <motion.div
          className="max-w-3xl mx-auto text-gray-300 space-y-6 text-base md:text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <section>
            <h2 className="text-xl text-purple-400 font-semibold mb-2">1. Acceptance of Terms</h2>
            <p>
              By inviting and using Danilxlo in your Discord server, you agree to comply with these Terms of Service.
              If you do not agree, please remove the bot from your server.
            </p>
          </section>

          <section>
            <h2 className="text-xl text-purple-400 font-semibold mb-2">2. Usage Rules</h2>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>You must comply with Discord’s Terms of Service and Community Guidelines.</li>
              <li>You may not use Danilxlo for malicious activity such as spam, abuse, or harassment.</li>
              <li>You may not attempt to reverse-engineer, modify, or self-host the bot without permission.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl text-purple-400 font-semibold mb-2">3. Limitation of Liability</h2>
            <p>
              The developer is not responsible for any direct or indirect damages caused by the use or misuse of Danilxlo. The bot is provided “as is” without any warranty.
            </p>
          </section>

          <section>
            <h2 className="text-xl text-purple-400 font-semibold mb-2">4. Termination</h2>
            <p>
              We reserve the right to ban or restrict access to Danilxlo if a user or server is found violating these terms or abusing the bot’s features.
            </p>
          </section>

          <section>
            <h2 className="text-xl text-purple-400 font-semibold mb-2">5. Contact</h2>
            <p>
              If you have questions or concerns regarding these terms, please contact:
            </p>
            <ul className="list-inside list-disc mt-2 space-y-1">
              <li><strong>Email:</strong> zarconxorp@gmail.com</li>
              <li><strong>Discord:</strong> Noctusvan</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl text-purple-400 font-semibold mb-2">6. Changes</h2>
            <p>
              These terms may be updated at any time. Continued use of Danilxlo after changes implies acceptance of the new terms.
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