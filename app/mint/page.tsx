'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useWallet, CardanoWallet } from '@meshsdk/react';
import { mintCertificate } from '@/lib/mintCertificate'; // Your mint logic here
import { buildCertificateMetadata } from '@/utils/metadataBuilder';

export default function MintPage() {
  const router = useRouter();
  const { connected, wallet, connect, disconnect } = useWallet();

  const [studentName, setStudentName] = useState('');
  const [course, setCourse] = useState('');
  const [date, setDate] = useState('');
  const [txHash, setTxHash] = useState('');
  const [assetName, setAssetName] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleMint() {
    if (!wallet) return alert('Please connect your wallet first');

    setLoading(true);
    const metadata = buildCertificateMetadata(studentName, course, date);
    try {
      const { txHash, assetName } = await mintCertificate(wallet, metadata);
      setTxHash(txHash);
      setAssetName(assetName);
    } catch (error) {
      alert('Minting failed: ' + error);
    }
    setLoading(false);
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl mb-4">University Admin - Mint Student Certificate</h1>

      {!connected ? (
        <>
          <CardanoWallet label="Connect Wallet" isDark={true} persist={true} />
          <button
            className="bg-green-600 text-white px-4 py-2 rounded mt-4"
            onClick={() => connect('mesh')} // Change 'mesh' if using another wallet
          >
            Connect Wallet
          </button>
        </>
      ) : (
        <>
          <button
            className="bg-red-600 text-white px-4 py-2 rounded mb-4"
            onClick={() => disconnect()}
          >
            Disconnect Wallet
          </button>

          <input
            className="mb-2 w-full p-2 border"
            placeholder="Student Name"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
          />
          <input
            className="mb-2 w-full p-2 border"
            placeholder="Course"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
          />
          <input
            className="mb-4 w-full p-2 border"
            placeholder="Date (YYYY-MM-DD)"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <button
            className="bg-blue-600 text-white px-4 py-2 rounded"
            onClick={handleMint}
            disabled={loading}
          >
            {loading ? 'Minting...' : 'Mint Certificate'}
          </button>

          {txHash && (
            <div className="mt-4">
              <p>✅ Minted successfully!</p>
              <p><strong>Asset Name:</strong> {assetName}</p>
              <p><strong>Tx Hash:</strong> {txHash}</p>

              <button
                className="mt-2 bg-purple-600 text-white px-4 py-2 rounded"
                onClick={() => router.push(`/certificate/${txHash}`)}
              >
                View Certificate
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
