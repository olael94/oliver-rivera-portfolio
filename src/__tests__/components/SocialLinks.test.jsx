import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import SocialLinks from '../../components/SocialLinks.jsx';

const mockLinks = [
  { name: 'GitHub', link: 'https://github.com', imageSrc: '/icons/github.png' },
  { name: 'LinkedIn', link: 'https://linkedin.com', imageSrc: '/icons/linkedin.png' },
];

test('renders all social links', () => {
  render(<SocialLinks socialLinks={mockLinks} />);

  expect(screen.getByTestId('socialLinks0')).toBeTruthy();
  expect(screen.getByTestId('socialLinks1')).toBeTruthy();
});

test('renders correct href for each link', () => {
  render(<SocialLinks socialLinks={mockLinks} />);

  expect(screen.getByTestId('socialLinks0').getAttribute('href')).toBe('https://github.com');
  expect(screen.getByTestId('socialLinks1').getAttribute('href')).toBe('https://linkedin.com');
});

test('renders correct label text for each link', () => {
  render(<SocialLinks socialLinks={mockLinks} />);

  expect(screen.getByTestId('socialLinks0').textContent).toContain('GitHub');
  expect(screen.getByTestId('socialLinks1').textContent).toContain('LinkedIn');
});

test('links open in a new tab', () => {
  render(<SocialLinks socialLinks={mockLinks} />);

  expect(screen.getByTestId('socialLinks0').getAttribute('target')).toBe('_blank');
});

test('shows fallback message when no links are provided', () => {
  render(<SocialLinks socialLinks={[]} />);

  expect(screen.getByText('No social links available')).toBeTruthy();
});
