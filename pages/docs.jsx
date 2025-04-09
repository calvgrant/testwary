import Head from "next/head";
import { motion } from "framer-motion";
import { FiCopy } from "react-icons/fi";
import { toast } from "react-hot-toast";

const endpoints = [
  {
    method: "GET",
    path: "/api/papkitsu",
    description: "Fotonya Kitsune Pakai Json",
  },
  {
    method: "GET",
    path: "/api/quoteid",
    description: "Mengembalikan kutipan motivasi atau inspiratif.",
  },
  {
    method: "GET",
    path: "/api/gombal",
    description: "Kata Kata Gombal Anjay.",
  },
  {
    method: "GET",
    path: "/api/jokereceh",
    description: "Joke recehan coy.",
  },
];

export default function Docs() {
  const baseUrl = "https://testwary.vercel.app";

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success("Link berhasil disalin!");
    });
  };

  return (
    <>
      <Head>
        <title>Dokumentasi API - TwaryAPI</title>
      </Head>

      <main className="min-h-screen bg-black text-white px-6 py-12">
        <motion.h1
          className="text-3xl md:text-5xl font-bold text-center text-blue-400 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Dokumentasi API
        </motion.h1>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {endpoints.map((ep, index) => {
            const fullUrl = `${baseUrl}${ep.path}`;
            return (
              <motion.div
                key={index}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="bg-gray-900 rounded-xl border border-gray-700 p-6 shadow-md cursor-pointer relative group"
                onClick={() => window.open(fullUrl, "_blank")}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-blue-500">
                    {ep.method}
                  </span>
                  <FiCopy
                    onClick={(e) => {
                      e.stopPropagation();
                      copyToClipboard(fullUrl);
                    }}
                    className="text-gray-400 hover:text-blue-400 transition cursor-pointer"
                    title="Salin link"
                  />
                </div>
                <h3 className="text-lg font-bold">{ep.path}</h3>
                <p className="text-sm text-gray-300 mt-1">{ep.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </main>
    </>
  );
}