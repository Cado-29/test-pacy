import type { AssetMetadata } from '@meshsdk/core';

export function buildCertificateMetadata(
  studentName: string,
  course: string,
  date: string,
  imageUri: string // data URI or ipfs://CID
): AssetMetadata {
  return {
    name: `Certificate - ${studentName}`,
    image: imageUri,
    mediaType: 'image/png',
    description: `Certificate for ${studentName} in ${course}`,
    files: [
      {
        mediaType: 'image/png',
        name: 'Certificate',
        src: imageUri,
      },
    ],
    extra: {
      course,
      issued: date,
    },
  };
}
