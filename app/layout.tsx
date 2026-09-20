import type { Metadata } from 'next';
import { Inter, Orbitron } from 'next/font/google';
import './globals.css';
import MouseGlow from '@/components/MouseGlow';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const orbitron = Orbitron({ subsets: ['latin'], variable: '--font-orbitron' });

export const metadata: Metadata = {
  title: 'PHISH HUNT | Cyber Awareness Event',
  description: 'Spot the Trap. Stay Safe. Interactive Phishing Investigation Game.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${orbitron.variable}`}>
        <MouseGlow />
        {children}
      </body>
    </html>
  );
}
