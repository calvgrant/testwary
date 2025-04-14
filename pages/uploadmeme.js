import { useState } from 'react';

export default function UploadMeme() {
  const [url, setUrl] = useState('');
  const [caption, setCaption] = useState('');
  const [uploader, setUploader] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Uploading...');

    const res = await fetch('/api/upload-meme', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url, caption, uploader }),
    });

    const data = await res.json();
    if (res.ok) {
      setStatus('Meme uploaded! ID: ' + data.id);
      setUrl('');
      setCaption('');
      setUploader('');
    } else {
      setStatus('Error: ' + data.error);
    }
  };

  return (
    <div className="min-h-screen p-4 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Upload Meme</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <input
          type="text"
          placeholder="Image URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Caption (optional)"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Uploader name"
          value={uploader}
          onChange={(e) => setUploader(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Upload
        </button>
      </form>
      {status && <p className="mt-4">{status}</p>}
    </div>
  );
}