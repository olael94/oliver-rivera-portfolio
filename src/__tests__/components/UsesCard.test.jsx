import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import UsesCard from '../../components/UsesCard.jsx';

test('renders the name correctly', () => {
  render(<UsesCard name="Hardware" content1="MacBook Pro" />);

  expect(screen.getByTestId('UsescardName').textContent).toBe('Hardware');
});

test('renders provided content paragraphs', () => {
  render(
    <UsesCard name="Hardware" content1="MacBook Pro" content2="LG Monitor" content3="Keychron" />
  );

  const paragraphs = screen.getAllByTestId('UsescardContent');
  expect(paragraphs).toHaveLength(3);
  expect(paragraphs[0].textContent).toBe('MacBook Pro');
  expect(paragraphs[1].textContent).toBe('LG Monitor');
  expect(paragraphs[2].textContent).toBe('Keychron');
});

test('does not render empty content slots', () => {
  render(<UsesCard name="Hardware" content1="MacBook Pro" />);

  const paragraphs = screen.getAllByTestId('UsescardContent');
  expect(paragraphs).toHaveLength(1);
});
