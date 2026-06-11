import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import ProjectCard from '../../components/ProjectCard.jsx';

const defaultProps = {
  logo: '/images/project-logo.png',
  name: 'DocRelief AI',
  content: 'AI-powered medical documentation.',
  link: 'https://docrelief.ai',
  github: 'https://github.com/olael94/docrelief-ai',
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

test('renders the live site link with correct href', () => {
  render(<ProjectCard {...defaultProps} />);

  expect(screen.getByTestId('projectCardLink').getAttribute('href')).toBe('https://docrelief.ai');
});

test('renders the github link with correct href', () => {
  render(<ProjectCard {...defaultProps} />);

  expect(screen.getByTestId('projectCardGithubLink').getAttribute('href')).toBe(
    'https://github.com/olael94/docrelief-ai'
  );
});

test('live site button is not rendered when link is not provided', () => {
  render(<ProjectCard {...defaultProps} link={undefined} />);

  expect(screen.queryByTestId('projectCardLink')).toBeNull();
});

test('source code button is not rendered when github is not provided', () => {
  render(<ProjectCard {...defaultProps} github={undefined} />);

  expect(screen.queryByTestId('projectCardGithubLink')).toBeNull();
});

test('live site link opens in a new tab', () => {
  render(<ProjectCard {...defaultProps} />);

  expect(screen.getByTestId('projectCardLink').getAttribute('target')).toBe('_blank');
});

test('source code link opens in a new tab', () => {
  render(<ProjectCard {...defaultProps} />);

  expect(screen.getByTestId('projectCardGithubLink').getAttribute('target')).toBe('_blank');
});

test('preview image links to the live site when one is available', () => {
  render(<ProjectCard {...defaultProps} preview="/images/preview.png" />);

  const preview = screen.getByTestId('projectCardPreview');
  const link = preview.closest('a');
  expect(link.getAttribute('href')).toBe('https://docrelief.ai');
  expect(link.getAttribute('target')).toBe('_blank');
});

test('preview image is not a link when no live site is available', () => {
  render(<ProjectCard {...defaultProps} preview="/images/preview.png" link={undefined} />);

  const preview = screen.getByTestId('projectCardPreview');
  expect(preview.closest('a')).toBeNull();
});
