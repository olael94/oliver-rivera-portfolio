import { Syne, Manrope, Caveat } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import { navLinks, footerLinks } from '@/data/nav';

const syne = Syne({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-syne',
  display: 'swap',
});

const manrope = Manrope({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-manrope',
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
      <body className={`${syne.variable} ${manrope.variable} ${caveat.variable}`}>
        <div className="flex flex-col min-h-screen">
          <header>
            <Navbar options={navLinks} />
            <ThemeSwitcher />
          </header>
          <main>{children}</main>
          <footer>
            <Footer links={footerLinks} />
          </footer>
        </div>
      </body>
    </html>
  );
}
