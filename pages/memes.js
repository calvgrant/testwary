import clientPromise from '../lib/mongodb';

export async function getServerSideProps() {
  const client = await clientPromise;
  const db = client.db();
  const memes = await db.collection('memes')
    .find({})
    .sort({ createdAt: -1 })
    .limit(50)
    .toArray();

  return {
    props: {
      memes: JSON.parse(JSON.stringify(memes))
    }
  };
}

export default function MemesPage({ memes }) {
  return (
    <div style={{
      padding: '2rem',
      fontFamily: 'sans-serif',
      background: '#fafafa',
      minHeight: '100vh'
    }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Meme Galeri Jomblo</h1>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '1.5rem'
      }}>
        {memes.map((meme, i) => (
          <div key={i} style={{
            background: '#fff',
            padding: '1rem',
            borderRadius: '12px',
            boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
          }}>
            <img
              src={meme.url}
              alt="meme"
              style={{
                width: '100%',
                borderRadius: '8px',
                marginBottom: '0.5rem'
              }}
            />
            <p style={{ margin: 0 }}><strong>{meme.uploader}</strong></p>
            <p style={{ margin: '0.25rem 0', fontSize: '0.9rem' }}>{meme.caption}</p>
            <p style={{ fontSize: '0.75rem', color: '#666' }}>
              {new Date(meme.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}