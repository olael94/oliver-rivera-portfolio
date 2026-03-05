import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import AboutMe from '../../components/AboutMe.jsx';

const defaultProps = {
  name: 'Oliver Rivera',
  content1: 'Paragraph one.',
  content2: 'Paragraph two.',
  content3: 'Paragraph three.',
  content4: 'Paragraph four.',
};

test('renders the name correctly', () => {
  render(<AboutMe {...defaultProps} />);

  expect(screen.getByTestId('aboutMeName').textContent).toBe('Oliver Rivera');
});

test('renders all four paragraphs', () => {
  render(<AboutMe {...defaultProps} />);

  const paragraphs = screen.getAllByTestId('aboutMeContent');
  expect(paragraphs).toHaveLength(4);
  expect(paragraphs[0].textContent).toBe('Paragraph one.');
  expect(paragraphs[1].textContent).toBe('Paragraph two.');
  expect(paragraphs[2].textContent).toBe('Paragraph three.');
  expect(paragraphs[3].textContent).toBe('Paragraph four.');
});
