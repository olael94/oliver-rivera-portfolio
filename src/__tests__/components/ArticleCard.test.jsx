import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import ArticleCard from '../../components/ArticleCard.jsx';

test('renders date, title, content, and link correctly', () => {
  render(
    <ArticleCard
      date="Jan 2025"
      title="My Article"
      content="Some content"
      link="https://example.com"
    />
  );

  expect(screen.getByTestId('articleCardDate').textContent).toBe('Jan 2025');
  expect(screen.getByTestId('articleCardTitle').textContent).toBe('My Article');
  expect(screen.getByTestId('articleCardContent').textContent).toBe('Some content');
  expect(screen.getByTestId('articleCardLink').getAttribute('href')).toBe('https://example.com');
});

test('link defaults to # when not provided', () => {
  render(<ArticleCard date="Jan 2025" title="My Article" content="Some content" />);

  expect(screen.getByTestId('articleCardLink').getAttribute('href')).toBe('#');
});

test('link opens in a new tab', () => {
  render(
    <ArticleCard
      date="Jan 2025"
      title="My Article"
      content="Some content"
      link="https://example.com"
    />
  );

  expect(screen.getByTestId('articleCardLink').getAttribute('target')).toBe('_blank');
});
