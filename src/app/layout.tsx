import './globals.css';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

export const metadata: Metadata = {
  title: 'Tilo Baumann Entwicklungen',
  description:
    'Produktion und Vertrieb von technischen Kunststoff-Spritzgussteilen',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='de'>
      <body>{children}</body>
    </html>
  );
}
