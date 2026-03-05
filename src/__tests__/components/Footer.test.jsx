import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import Footer from '../../components/Footer.jsx';

const mockLinks = [
  { title: 'Home', url: '/' },
  { title: 'GitHub', url: 'https://github.com' },
];

test('renders all links correctly', () => {
  render(<Footer links={mockLinks} />);

  const link0 = screen.getByTestId('footerLink0').querySelector('a');
  const link1 = screen.getByTestId('footerLink1').querySelector('a');

  expect(link0.textContent).toBe('Home');
  expect(link0.getAttribute('href')).toBe('/');
  expect(link1.textContent).toBe('GitHub');
  expect(link1.getAttribute('href')).toBe('https://github.com');
});

test('renders the current year in copyright', () => {
  render(<Footer />);

  const year = new Date().getFullYear().toString();
  expect(screen.getByTestId('footerContent').textContent).toContain(year);
});

test('renders no links when links prop is empty', () => {
  render(<Footer />);

  expect(screen.queryByTestId('footerLink0')).toBeNull();
});
