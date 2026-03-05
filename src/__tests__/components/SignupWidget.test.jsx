import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { expect, test } from 'vitest';
import SignupWidget from '../../components/SignupWidget.jsx';

const defaultProps = {
  title: 'Stay in the loop',
  content: 'Get updates on my latest work.',
  simulateNetworkRequestTime: 0,
};

test('renders the title and content correctly', () => {
  render(<SignupWidget {...defaultProps} />);

  expect(screen.getByTestId('signupWidgetTitle').textContent).toBe('Stay in the loop');
  expect(screen.getByTestId('signupWidgetContent').textContent).toBe(
    'Get updates on my latest work.'
  );
});

test('renders the email input and join button', () => {
  render(<SignupWidget {...defaultProps} />);

  expect(screen.getByTestId('signupWidgetInput')).toBeTruthy();
  expect(screen.getByTestId('signupWidgetButton').textContent).toBe('Join');
});

test('shows an error when submitting an invalid email', async () => {
  render(<SignupWidget {...defaultProps} />);

  fireEvent.change(screen.getByTestId('signupWidgetInput'), { target: { value: 'not-an-email' } });
  fireEvent.click(screen.getByTestId('signupWidgetButton'));

  expect(await screen.findByText('Please enter a valid email address')).toBeTruthy();
});

test('clears the error when the user starts typing again', async () => {
  render(<SignupWidget {...defaultProps} />);

  fireEvent.change(screen.getByTestId('signupWidgetInput'), { target: { value: 'bad' } });
  fireEvent.click(screen.getByTestId('signupWidgetButton'));
  await screen.findByText('Please enter a valid email address');

  fireEvent.change(screen.getByTestId('signupWidgetInput'), { target: { value: 'bad@' } });

  expect(screen.queryByText('Please enter a valid email address')).toBeNull();
});

test('shows success message after valid email submission', async () => {
  render(<SignupWidget {...defaultProps} />);

  fireEvent.change(screen.getByTestId('signupWidgetInput'), {
    target: { value: 'oliver@test.com' },
  });
  fireEvent.click(screen.getByTestId('signupWidgetButton'));

  await waitFor(() => {
    expect(screen.getByTestId('signupWidgetMessage').textContent).toContain('oliver@test.com');
  });
});

test('hides the input and button after successful submission', async () => {
  render(<SignupWidget {...defaultProps} />);

  fireEvent.change(screen.getByTestId('signupWidgetInput'), {
    target: { value: 'oliver@test.com' },
  });
  fireEvent.click(screen.getByTestId('signupWidgetButton'));

  await waitFor(() => {
    expect(screen.queryByTestId('signupWidgetInput')).toBeNull();
    expect(screen.queryByTestId('signupWidgetButton')).toBeNull();
  });
});
