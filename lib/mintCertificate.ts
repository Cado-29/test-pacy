import {
  Transaction,
  ForgeScript,
  AssetMetadata,
} from '@meshsdk/core';

export async function mintCertificate(wallet: any, metadata: AssetMetadata) {
  // Use wallet.getUsedAddresses() to get addresses
  const addresses = await wallet.getUsedAddresses();
  if (!addresses || addresses.length === 0) {
    throw new Error('No used addresses found in wallet');
  }
  const address = addresses[0]; // take first address

  const forgingScript = ForgeScript.withOneSignature(address);

  const assetName = `CERT${Date.now()}`;

  const asset = {
    assetName,
    assetQuantity: '1',
    metadata,
    label: '721' as const,
    recipient: address,
  };

  const tx = new Transaction({ initiator: wallet });

  tx.mintAsset(forgingScript, asset);

  const unsignedTx = await tx.build();

  const signedTx = await wallet.signTx(unsignedTx);

  const txHash = await wallet.submitTx(signedTx);

  return { txHash, assetName };
}
