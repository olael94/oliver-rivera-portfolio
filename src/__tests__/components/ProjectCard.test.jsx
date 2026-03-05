import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import ProjectCard from '../../components/ProjectCard.jsx';

const defaultProps = {
  logo: '/images/project-logo.png',
  name: 'DocRelief AI',
  content: 'AI-powered medical documentation.',
  link: 'https://docrelief.ai',
};

test('renders the project name correctly', () => {
  render(<ProjectCard {...defaultProps} />);

  expect(screen.getByTestId('projectCardName').textContent).toBe('DocRelief AI');
});

test('renders the project description correctly', () => {
  render(<ProjectCard {...defaultProps} />);

  expect(screen.getByTestId('projectCardContent').textContent).toBe(
    'AI-powered medical documentation.'
  );
});

test('renders the logo image', () => {
  render(<ProjectCard {...defaultProps} />);

  expect(screen.getByTestId('projectCardLogo').getAttribute('src')).toBe(
    '/images/project-logo.png'
  );
});

test('renders the link with correct href', () => {
  render(<ProjectCard {...defaultProps} />);

  expect(screen.getByTestId('projectCardLink').getAttribute('href')).toBe('https://docrelief.ai');
});

test('link defaults to # when not provided', () => {
  render(<ProjectCard {...defaultProps} link={undefined} />);

  expect(screen.getByTestId('projectCardLink').getAttribute('href')).toBe('#');
});

test('link opens in a new tab', () => {
  render(<ProjectCard {...defaultProps} />);

  expect(screen.getByTestId('projectCardLink').getAttribute('target')).toBe('_blank');
});
