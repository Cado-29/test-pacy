'use client';

import { use } from 'react';
import { useEffect, useState } from 'react';

type Certificate = {
  name: string;
  description: string;
  extra: {
    course: string;
    issued: string;
  };
  image: string;
  mediaType: string;
};

export default function CertificatePage({ params }: { params: Promise<{ txHash: string }> }) {
  const { txHash } = use(params);

  const [certificate, setCertificate] = useState<Certificate | null>(null);
  const [error, setError] = useState<string | null>(null);

  console.log("VSDvsdvdsvdsvsd",process.env.NEXT_PUBLIC_BLOCKFROST_PROJECT_ID);

  useEffect(() => {
    async function fetchTxMetadata() {
      try {
        const res = await fetch(
          `https://cardano-preprod.blockfrost.io/api/v0/txs/${txHash}/metadata`,
          {
            headers: {
              project_id: process.env.NEXT_PUBLIC_BLOCKFROST_PROJECT_ID!,
            },
          }
        );

        if (!res.ok) {
          throw new Error(`Blockfrost API error: ${res.status} ${res.statusText}`);
        }

        const data = await res.json();

        // Find metadata with label "721"
        const metadata721 = data.find((item: any) => item.label === '721');

        if (!metadata721) {
          setError('No CIP-721 metadata found.');
          return;
        }

        const jsonMetadata = metadata721.json_metadata;

        const policyIds = Object.keys(jsonMetadata);
        if (policyIds.length === 0) {
          setError('No policy IDs found in metadata.');
          return;
        }
        const policyId = policyIds[0];

        const assets = jsonMetadata[policyId];
        const assetNames = Object.keys(assets);
        if (assetNames.length === 0) {
          setError('No assets found in metadata.');
          return;
        }

        const assetName = assetNames[0];
        const certData: Certificate = assets[assetName];

        setCertificate(certData);
      } catch (err: any) {
        setError('Failed to fetch minted assets: ' + err.message);
      }
    }

    fetchTxMetadata();
  }, [txHash]);

  if (error) return <div className="p-6 text-red-600">❌ {error}</div>;
  if (!certificate) return <div className="p-6">🔄 Loading certificate...</div>;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-2">🎓 Certificate Details</h1>
      <p><strong>Name:</strong> {certificate.name}</p>
      <p><strong>Description:</strong> {certificate.description}</p>
      <p><strong>Course:</strong> {certificate.extra.course}</p>
      <p><strong>Issued Date:</strong> {certificate.extra.issued}</p>
      {certificate.image && (
        <img
          className="mt-4 border"
          src={certificate.image.replace('ipfs://', 'https://ipfs.io/ipfs/')}
          alt="Certificate"
        />
      )}
    </div>
  );
}
