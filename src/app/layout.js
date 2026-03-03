import { Roboto } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import ThemeSwitcher from '@/components/ThemeSwitcher/ThemeSwitcher';

const roboto = Roboto({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
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
      <body className={roboto.className}>
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
