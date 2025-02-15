import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Markdown to PNG Converter',
  description: 'Convert Markdown files to PNG images',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
