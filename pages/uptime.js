import { useState } from 'react';
import axios from 'axios';

const endpoints = [
  {
    name: 'Main API',
    url: 'https://testwary.vercel.app/api/papkitsu',
  },
  {
    name: 'Docs',
    url: 'https://testwary.vercel.app/docs',
  },
];

export default function UptimePage() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const checkStatus = async () => {
    setLoading(true);
    try {
      const res = await axios.post('/api/check', { endpoints });
      setResults(res.data.statuses);
    } catch (err) {
      console.error('Error checking status:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 to-gray-900 text-white py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">TwaryAPI Uptime Checker</h1>
        <button
          onClick={checkStatus}
          className="mb-8 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-md font-medium transition"
        >
          {loading ? 'Checking...' : 'Ping Sekarang'}
        </button>

        <div className="space-y-4">
          {results.map((res, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-lg border ${
                res.online
                  ? 'bg-green-900/50 border-green-500'
                  : 'bg-red-900/50 border-red-500'
              }`}
            >
              <div className="font-semibold text-lg">{res.name}</div>
              <div className="text-sm break-all">{res.url}</div>
              <div
                className={`mt-1 text-sm font-bold ${
                  res.online ? 'text-green-400' : 'text-red-400'
                }`}
              >
                {res.online ? 'Online' : 'Offline'}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}