// pages/uptime.js

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const apis = [
  { name: 'TwaryAPI Main', url: 'https://twaryapi.vercel.app/api' },
  // Tambah API lain di sini
];

export default function UptimePage() {
  const [statuses, setStatuses] = useState({});
  const [loading, setLoading] = useState(false);

  const checkAPIs = async () => {
    setLoading(true);
    try {
      const res = await axios.post('/api/check', { apis });
      setStatuses(res.data.statuses);
    } catch (err) {
      console.error('Error checking APIs:', err);
    }
    setLoading(false);
  };

  useEffect(() => {
    checkAPIs();
  }, []);

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">API Uptime Monitor</h1>

      <Button onClick={checkAPIs} disabled={loading}>
        {loading ? 'Checking...' : 'Ping Sekarang'}
      </Button>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
        {apis.map((api) => (
          <Card key={api.url} className="rounded-xl border">
            <CardContent className="p-4">
              <h2 className="text-lg font-semibold">{api.name}</h2>
              <p className="text-sm break-all text-muted-foreground">{api.url}</p>
              <div className="mt-2">
                <span
                  className={`px-2 py-1 rounded text-white text-xs ${
                    statuses[api.url] === 'Online' ? 'bg-green-500' : 'bg-red-500'
                  }`}
                >
                  {statuses[api.url] || 'Unknown'}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}