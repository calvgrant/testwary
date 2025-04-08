import { useState } from "react";
import { motion } from "framer-motion";
import { FiClock, FiGithub, FiZap } from "react-icons/fi";
import { FaDiscord, FaGithub } from "react-icons/fa";

const infoCards = [
  {
    icon: <FiClock size={28} />,
    title: "Online Forever",
    description: "API ini aktif 24 jam nonstop, bisa diakses kapan saja.",
  },
  {
    icon: <FiGithub size={28} />,
    title: "Open Source",
    description: "Bebas digunakan dan dikembangkan. Tersedia di GitHub.",
  },
  {
    icon: <FiZap size={28} />,
    title: "Made with Next.js",
    description: "Dibangun dengan teknologi web modern dan cepat.",
  },
];

export default function InfoCards() {
  const [activeCard, setActiveCard] = useState(null);

  return (
    <div className="flex flex-col gap-8 my-12">
      {/* Info cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {infoCards.map((card, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveCard(i)}
            className={`cursor-pointer bg-gray-900 rounded-2xl p-6 border transition-all duration-300 shadow-lg text-white ${
              activeCard === i
                ? "ring-4 ring-blue-500/50 border-blue-500"
                : "border-gray-700"
            }`}
          >
            <div className="text-blue-400 mb-2">{card.icon}</div>
            <h3 className="text-xl font-semibold mb-1">{card.title}</h3>
            <p className="text-sm text-gray-300">{card.description}</p>
          </motion.div>
        ))}
      </div>

      {/* GitHub & Discord buttons */}
      <div className="flex justify-center gap-4">
        <a
          href="https://github.com/calvgrant"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-xl shadow transition"
        >
          <FaGithub /> GitHub
        </a>
        <a
          href="https://discordapp.com/users/715783278237450280"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-xl shadow transition"
        >
          <FaDiscord /> Discord
        </a>
      </div>
    </div>
  );
}