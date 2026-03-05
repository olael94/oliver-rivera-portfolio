import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import ProjectPageIntro from '../../components/ProjectPageIntro.jsx';

test('renders the name correctly', () => {
  render(<ProjectPageIntro name="My Projects" content="A collection of my work." />);

  expect(screen.getByTestId('projectPageIntroName').textContent).toBe('My Projects');
});

test('renders the content correctly', () => {
  render(<ProjectPageIntro name="My Projects" content="A collection of my work." />);

  expect(screen.getByTestId('projectPageIntroContent').textContent).toBe(
    'A collection of my work.'
  );
});
