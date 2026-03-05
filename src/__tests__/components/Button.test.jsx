import { render, screen, fireEvent } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import Button from '../../components/Button.jsx';

test('renders children correctly', () => {
  render(<Button>Click me</Button>);

  expect(screen.getByRole('button').textContent).toBe('Click me');
});

test('renders as a button when no href is provided', () => {
  render(<Button>Click me</Button>);

  expect(screen.getByRole('button')).toBeTruthy();
});

test('calls handleClick when clicked', () => {
  const handleClick = vi.fn();
  render(<Button handleClick={handleClick}>Click me</Button>);

  fireEvent.click(screen.getByRole('button'));

  expect(handleClick).toHaveBeenCalledTimes(1);
});

test('does not call handleClick when disabled', () => {
  const handleClick = vi.fn();
  render(
    <Button disabled handleClick={handleClick}>
      Click me
    </Button>
  );

  fireEvent.click(screen.getByRole('button'));

  expect(handleClick).not.toHaveBeenCalled();
});

test('button is disabled when disabled prop is passed', () => {
  render(<Button disabled>Click me</Button>);

  expect(screen.getByRole('button').disabled).toBe(true);
});
