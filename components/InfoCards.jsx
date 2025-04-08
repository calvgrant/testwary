
import { motion } from "framer-motion";
import { FiClock, FiGithub, FiZap } from "react-icons/fi";

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
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-12">
      {infoCards.map((card, i) => (
        <motion.div
          key={i}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gray-900 rounded-2xl p-6 border border-gray-700 shadow-lg text-white"
        >
          <div className="text-blue-400 mb-2">{card.icon}</div>
          <h3 className="text-xl font-semibold mb-1">{card.title}</h3>
          <p className="text-sm text-gray-300">{card.description}</p>
        </motion.div>
      ))}
    </div>
  );
}
