import { NextResponse } from 'next/server';
import { BlockfrostProvider, MeshWallet, Transaction, ForgeScript } from '@meshsdk/core';
import type { AssetMetadata, Mint } from '@meshsdk/core';

export async function POST(req: Request) {
  const { metadata }: { metadata: AssetMetadata } = await req.json();

  const provider = new BlockfrostProvider(process.env.NEXT_PUBLIC_BLOCKFROST_PROJECT_ID!);

  const wallet = new MeshWallet({
    networkId: 0,
    fetcher: provider,
    submitter: provider,
    key: {
      type: 'mnemonic',
      words: (process.env.MNEMONIC_PHRASE || '').split(' '),
    },
  });

  const address = await wallet.getChangeAddress();
  const forgingScript = ForgeScript.withOneSignature(address);
  const assetName = `CERT${Date.now()}`;

  const asset: Mint = {
    assetName,
    assetQuantity: '1',
    metadata,
    label: '721',
    recipient: address,
  };

  const tx = new Transaction({ initiator: wallet });
  tx.mintAsset(forgingScript, asset);

  const unsignedTx = await tx.build();
  const signedTx = await wallet.signTx(unsignedTx);
  const txHash = await wallet.submitTx(signedTx);

  return NextResponse.json({ txHash, assetName });
}
