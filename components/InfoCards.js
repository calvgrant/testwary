import { motion } from 'framer-motion'
import { FaServer } from 'react-icons/fa'

const cards = [
  {
    title: 'Online Forever',
    description: 'API ini selalu online, gratis, dan dapat digunakan kapan saja.',
    icon: <FaServer />,
  },
  {
    title: 'Simple & Cepat',
    description: 'Didesain untuk kemudahan dan kecepatan penggunaan.',
    icon: <FaServer />,
  },
]

export default function InfoCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
      {cards.map((card, index) => (
        <motion.div
          key={index}
          className="bg-gray-900 rounded-xl p-6 border border-gray-700 shadow-md"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-center gap-3 text-blue-400 text-xl mb-2">
            {card.icon}
            <h3 className="font-bold">{card.title}</h3>
          </div>
          <p className="text-gray-300 text-sm">{card.description}</p>
        </motion.div>
      ))}
    </div>
  )
}
