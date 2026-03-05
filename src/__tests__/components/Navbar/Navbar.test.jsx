import { render, screen, fireEvent } from '@testing-library/react';
import { expect, test, vi, beforeAll } from 'vitest';
import Navbar from '../../../components/Navbar/Navbar.jsx';

beforeAll(() => {
  window.matchMedia = vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }));
});

vi.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

vi.mock('next/link', () => ({
  default: ({ href, children, ...props }) => <a href={href} {...props}>{children}</a>,
}));

test('renders the navbar', () => {
  render(<Navbar />);

  expect(screen.getByRole('navigation')).toBeTruthy();
});

test('renders desktop nav links', () => {
  render(<Navbar />);

  expect(screen.getByText('Home')).toBeTruthy();
  expect(screen.getByText('About')).toBeTruthy();
  expect(screen.getByText('Projects')).toBeTruthy();
});

test('does not show mobile hamburger button on desktop', () => {
  render(<Navbar />);

  expect(screen.queryByLabelText('Toggle menu')).toBeNull();
});
