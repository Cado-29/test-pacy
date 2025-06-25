'use client';

import './globals.css';
import '@meshsdk/react/styles.css';
import { MeshProvider } from '@meshsdk/react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <MeshProvider>
          {children}
        </MeshProvider>
      </body>
    </html>
  );
}
