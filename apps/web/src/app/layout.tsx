import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';

import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Vaartiva',
    template: '%s | Vaartiva',
  },
  description:
    'An AI-native meeting and collaboration platform designed to bring people, knowledge, and intelligent assistance together.',
  applicationName: 'Vaartiva',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" data-theme="light">
      <body className="min-h-screen bg-canvas font-sans text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
