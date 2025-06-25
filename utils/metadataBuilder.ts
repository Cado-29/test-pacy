import type { AssetMetadata } from '@meshsdk/core';

export function buildCertificateMetadata(
  studentName: string,
  course: string,
  date: string,
  imageCid: string // new parameter for IPFS CID (without ipfs:// prefix)
): AssetMetadata {
  const ipfsUri = `ipfs://${imageCid}`;

  return {
    name: `Certificate - ${studentName}`,
    image: ipfsUri,
    mediaType: 'image/png',
    description: `Certificate for ${studentName} in ${course}`,
    files: [
      {
        mediaType: 'image/png',
        name: 'Certificate',
        src: ipfsUri,
      },
    ],
    extra: {
      course,
      issued: date,
    },
  };
}
