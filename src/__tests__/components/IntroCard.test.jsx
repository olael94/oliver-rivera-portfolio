import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import IntroCard from '../../components/IntroCard.jsx';

const defaultProps = {
  logo: '/images/profile.jpg',
  name: 'Oliver Rivera, Developer',
  content: 'I build things for the web.',
  links: [{ title: 'GitHub', url: 'https://github.com', icon: '/icons/github.png' }],
};

test('renders the profile image', () => {
  render(<IntroCard {...defaultProps} />);

  expect(screen.getByTestId('introCardLogo').getAttribute('src')).toBe('/images/profile.jpg');
});

test('renders the name', () => {
  render(<IntroCard {...defaultProps} />);

  expect(screen.getByTestId('introCardName').textContent).toContain('Oliver Rivera');
});

test('renders content as a string', () => {
  render(<IntroCard {...defaultProps} />);

  expect(screen.getByTestId('introCardContent').textContent).toBe('I build things for the web.');
});

test('renders content as an array of paragraphs', () => {
  render(<IntroCard {...defaultProps} content={['Paragraph one.', 'Paragraph two.']} />);

  const paragraphs = screen.getAllByTestId('introCardContent');
  expect(paragraphs).toHaveLength(2);
  expect(paragraphs[0].textContent).toBe('Paragraph one.');
  expect(paragraphs[1].textContent).toBe('Paragraph two.');
});

test('renders social links with correct href', () => {
  render(<IntroCard {...defaultProps} />);

  const link = screen.getByRole('link', { name: 'GitHub' });
  expect(link.getAttribute('href')).toBe('https://github.com');
});

test('social links open in a new tab', () => {
  render(<IntroCard {...defaultProps} />);

  const link = screen.getByRole('link', { name: 'GitHub' });
  expect(link.getAttribute('target')).toBe('_blank');
});
