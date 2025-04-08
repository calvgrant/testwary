import { FaGithub, FaDiscord } from 'react-icons/fa'

export default function ContactButton() {
  return (
    <div className="mt-8 space-x-4">
      <a href="https://github.com/yourusername" target="_blank" className="inline-flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg">
        <FaGithub /> GitHub
      </a>
      <a href="https://discord.com/users/yourdiscordid" target="_blank" className="inline-flex items-center gap-2 bg-indigo-700 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg">
        <FaDiscord /> Discord
      </a>
    </div>
  )
}
