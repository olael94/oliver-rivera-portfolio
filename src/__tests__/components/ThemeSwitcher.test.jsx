import { render, screen, fireEvent } from '@testing-library/react';
import { expect, test, beforeEach, afterEach } from 'vitest';
import ThemeSwitcher from '../../components/ThemeSwitcher.jsx';

const createLocalStorageMock = () => {
  let store = {};
  return {
    getItem: (key) => (key in store ? store[key] : null),
    setItem: (key, value) => {
      store[key] = String(value);
    },
    clear: () => {
      store = {};
    },
  };
};

beforeEach(() => {
  Object.defineProperty(window, 'localStorage', {
    value: createLocalStorageMock(),
    configurable: true,
  });
});

afterEach(() => {
  document.body.classList.remove('dark');
});

test('renders the toggle button', () => {
  render(<ThemeSwitcher />);

  expect(screen.getByTestId('themeSwitcherButton')).toBeTruthy();
});

test('defaults to dark mode', () => {
  render(<ThemeSwitcher />);

  expect(document.body.classList.contains('dark')).toBe(true);
});

test('removes dark class when clicked', () => {
  render(<ThemeSwitcher />);

  fireEvent.click(screen.getByTestId('themeSwitcherButton'));

  expect(document.body.classList.contains('dark')).toBe(false);
});

test('adds dark class back when clicked twice', () => {
  render(<ThemeSwitcher />);

  const button = screen.getByTestId('themeSwitcherButton');
  fireEvent.click(button);
  fireEvent.click(button);

  expect(document.body.classList.contains('dark')).toBe(true);
});

test('respects a previously stored light preference', () => {
  window.localStorage.setItem('theme', 'light');

  render(<ThemeSwitcher />);

  expect(document.body.classList.contains('dark')).toBe(false);
});
