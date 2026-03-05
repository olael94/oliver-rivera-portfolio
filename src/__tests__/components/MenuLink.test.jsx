import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import MenuLink from '../../components/MenuLink.jsx';

test('renders the email text correctly', () => {
  render(
    <MenuLink email="hello@oliver.dev" imageSrc="/icons/email.png" link="mailto:hello@oliver.dev" />
  );

  expect(screen.getByTestId('menuLink').textContent).toContain('hello@oliver.dev');
});

test('renders the correct href', () => {
  render(
    <MenuLink email="hello@oliver.dev" imageSrc="/icons/email.png" link="mailto:hello@oliver.dev" />
  );

  expect(screen.getByTestId('menuLink').getAttribute('href')).toBe('mailto:hello@oliver.dev');
});

test('link defaults to # when not provided', () => {
  render(<MenuLink email="hello@oliver.dev" imageSrc="/icons/email.png" />);

  expect(screen.getByTestId('menuLink').getAttribute('href')).toBe('#');
});

test('link opens in a new tab', () => {
  render(
    <MenuLink email="hello@oliver.dev" imageSrc="/icons/email.png" link="mailto:hello@oliver.dev" />
  );

  expect(screen.getByTestId('menuLink').getAttribute('target')).toBe('_blank');
});
