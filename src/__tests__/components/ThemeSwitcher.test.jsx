import { render, screen, fireEvent } from '@testing-library/react';
import { expect, test, afterEach } from 'vitest';
import ThemeSwitcher from '../../components/ThemeSwitcher.jsx';

afterEach(() => {
  document.body.classList.remove('dark');
});

test('renders the toggle button', () => {
  render(<ThemeSwitcher />);

  expect(screen.getByTestId('themeSwitcherButton')).toBeTruthy();
});

test('adds dark class to body when clicked', () => {
  render(<ThemeSwitcher />);

  fireEvent.click(screen.getByTestId('themeSwitcherButton'));

  expect(document.body.classList.contains('dark')).toBe(true);
});

test('removes dark class when clicked twice', () => {
  render(<ThemeSwitcher />);

  const button = screen.getByTestId('themeSwitcherButton');
  fireEvent.click(button);
  fireEvent.click(button);

  expect(document.body.classList.contains('dark')).toBe(false);
});
