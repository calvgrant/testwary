import Head from "next/head";
import { useState } from "react";
import { motion } from "framer-motion";

const endpoints = [
  { label: "GET /papkitsu", path: "/api/papkitsu" },
  { label: "GET /quoteid", path: "/api/quoteid" },
  { label: "GET /gombal", path: "/api/gombal" },
  { label: "GET /jokereceh", path: "/api/jokereceh" },
  { label: "GET /quotedaily", path: "/api/quotedaily"},
  { label: "GET /random-meme", path: "/api/random-meme"},
];

export default function Tester() {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState(null);

  const handleTest = async (path, index) => {
    const url = `https://testwary.vercel.app${path}`;
    setActive(index);
    setLoading(true);
    setResponse(null);
    try {
      const res = await fetch(url);
      const data = await res.json();
      setResponse(JSON.stringify(data, null, 2));
    } catch (err) {
      setResponse("Gagal mengambil data. Pastikan endpoint valid.");
    }
    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>Tester API - TwaryAPI</title>
      </Head>

      <main className="min-h-screen bg-black text-white px-6 py-12">
        <motion.h1
          className="text-3xl md:text-5xl font-bold text-center mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Tes Endpoint API
        </motion.h1>

        {/* Endpoint Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {endpoints.map((ep, i) => (
            <button
              key={i}
              onClick={() => handleTest(ep.path, i)}
              className={`px-4 py-2 rounded-xl transition font-medium shadow-lg ${
                active === i
                  ? "bg-blue-600 ring-2 ring-blue-400"
                  : "bg-gray-800 hover:bg-gray-700"
              }`}
            >
              {ep.label}
            </button>
          ))}
        </div>

        {/* Response Viewer */}
        <div className="bg-gray-900 rounded-xl p-4 whitespace-pre-wrap text-sm font-mono overflow-auto max-w-4xl mx-auto">
          {loading
            ? "Memuat..."
            : response || "Klik salah satu tombol di atas untuk mencoba API."}
        </div>
      </main>
    </>
  );
}