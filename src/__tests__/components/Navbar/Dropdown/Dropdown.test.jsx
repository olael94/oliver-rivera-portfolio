import { render, screen, fireEvent } from '@testing-library/react';
import { expect, test } from 'vitest';
import Dropdown from '../../../../components/Navbar/Dropdown/Dropdown.jsx';

const mockOptions = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
];

test('renders the menu button', () => {
  render(<Dropdown options={mockOptions} />);

  expect(screen.getByTestId('menuButton')).toBeTruthy();
});

test('does not show options before clicking', () => {
  render(<Dropdown options={mockOptions} />);

  expect(screen.queryByText('Home')).toBeNull();
  expect(screen.queryByText('About')).toBeNull();
});

test('shows options after clicking the menu button', () => {
  render(<Dropdown options={mockOptions} />);

  fireEvent.click(screen.getByTestId('menuButton'));

  expect(screen.getByText('Home')).toBeTruthy();
  expect(screen.getByText('About')).toBeTruthy();
});

test('hides options after clicking the menu button twice', () => {
  render(<Dropdown options={mockOptions} />);

  fireEvent.click(screen.getByTestId('menuButton'));
  fireEvent.click(screen.getByTestId('menuButton'));

  expect(screen.queryByText('Home')).toBeNull();
  expect(screen.queryByText('About')).toBeNull();
});

test('renders correct href for each option', () => {
  render(<Dropdown options={mockOptions} />);

  fireEvent.click(screen.getByTestId('menuButton'));

  expect(screen.getByText('Home').getAttribute('href')).toBe('/');
  expect(screen.getByText('About').getAttribute('href')).toBe('/about');
});
