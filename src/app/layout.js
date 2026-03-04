import { Syne, Manrope } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import ThemeSwitcher from '@/components/ThemeSwitcher/ThemeSwitcher';

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

export const metadata = {
  title: 'Oliver Rivera',
  description: 'Software Engineer, Father, and Believer',
};

const navOptions = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/projects', label: 'Projects' },
  { path: '/uses', label: 'Uses' },
];

const footerLinks = [
  { title: 'Home', url: '/' },
  { title: 'About', url: '/about' },
  { title: 'Projects', url: '/projects' },
  { title: 'Uses', url: '/uses' },
];

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${syne.variable} ${manrope.variable}`}>
        <div className="flex flex-col min-h-screen">
          <header>
            <Navbar options={navOptions} />
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
