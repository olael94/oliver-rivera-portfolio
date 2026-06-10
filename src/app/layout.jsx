import { Syne, Quicksand, Caveat } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer';
import MusicMotionBackground from '@/components/MusicMotionBackground';
import { navLinks, footerLinks } from '@/data/nav';

const syne = Syne({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-syne',
  display: 'swap',
});

const quicksand = Quicksand({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-quicksand',
  display: 'swap',
});

const caveat = Caveat({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-caveat',
  display: 'swap',
});

export const metadata = {
  title: 'Oliver Rivera',
  description: 'Software Engineer, Father, and Believer',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${syne.variable} ${quicksand.variable} ${caveat.variable}`}>
        <MusicMotionBackground />
        <div className="flex flex-col min-h-screen">
          <header className="w-full">
            <div className="w-full h-full max-w-screen-2xl mx-auto">
              <Navbar options={navLinks} />
            </div>
          </header>
          <main className="w-full max-w-screen-2xl mx-auto px-6">{children}</main>
          <footer>
            <Footer links={footerLinks} />
          </footer>
        </div>
      </body>
    </html>
  );
}
