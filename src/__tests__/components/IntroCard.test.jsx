import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import IntroCard from '../../components/IntroCard.jsx';

const defaultProps = {
  name: 'Oliver',
  roleOutline: 'SOFTWARE',
  roleAccent: 'ENGINEER.',
  tag: ['Available for work', 'Open to internships', 'Part-time or full-time opportunities'],
  content: 'I build things for the web.',
  links: [{ title: 'GitHub', url: 'https://github.com', icon: '/icons/github.png' }],
  emailLink: {
    email: 'me@example.com',
    imageSrc: '/icons/email.png',
    link: 'mailto:me@example.com',
  },
};

test('renders the name', () => {
  render(<IntroCard {...defaultProps} />);

  expect(screen.getByTestId('introCardName').textContent).toContain('OLIVER');
});

test('renders the role and tag', () => {
  render(<IntroCard {...defaultProps} />);

  expect(screen.getByTestId('introCardName').textContent).toContain('SOFTWARE');
  expect(screen.getByTestId('introCardName').textContent).toContain('ENGINEER.');
  expect(screen.getByTestId('terminalTyper')).toBeTruthy();
});

test('renders content', () => {
  render(<IntroCard {...defaultProps} />);

  expect(screen.getByTestId('introCardContent').textContent).toBe('I build things for the web.');
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

test('renders the email link', () => {
  render(<IntroCard {...defaultProps} />);

  const link = screen.getByRole('link', { name: 'Email' });
  expect(link.getAttribute('href')).toBe('mailto:me@example.com');
});
