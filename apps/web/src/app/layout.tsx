import './globals.css';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SolfaMe - AI Music Transcription for Choirs',
  description:
    'Transform any music into SATB choir parts with solfa notation using AI. Perfect for choir directors and music educators.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className='font-sans antialiased'>{children}</body>
    </html>
  );
}
