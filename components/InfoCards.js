'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

const cards = [
  {
    title: 'Online Forever',
    description: 'TwaryAPI selalu aktif 24/7 dan tersedia untuk umum.',
  },
  {
    title: 'Cepat dan Handal',
    description: 'Respons API cepat dan cocok untuk kebutuhan pengembangan Anda.',
  },
]

export default function InfoCards() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
      {cards.map((card, index) => (
        <motion.div
          key={index}
          className={`rounded-2xl p-6 border border-blue-500 transition-all duration-300 bg-gradient-to-br from-blue-900 to-blue-700 ${
            hoveredIndex === index
              ? 'shadow-[0_0_25px_5px_rgba(59,130,246,0.7)]'
              : 'shadow-md'
          }`}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
          whileHover={{ scale: 1.03 }}
        >
          <h3 className="text-2xl font-semibold text-white mb-2">
            {card.title}
          </h3>
          <p className="text-gray-300">{card.description}</p>
        </motion.div>
      ))}
    </div>
  )
}