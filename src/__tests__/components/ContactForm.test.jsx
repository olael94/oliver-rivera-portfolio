import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { expect, test, vi, beforeEach, afterEach } from 'vitest';
import ContactForm from '../../components/ContactForm.jsx';

beforeEach(() => {
  global.fetch = vi.fn();
});

afterEach(() => {
  vi.restoreAllMocks();
});

const fillForm = ({ name, email, message }) => {
  fireEvent.change(screen.getByTestId('contactFormName'), { target: { value: name } });
  fireEvent.change(screen.getByTestId('contactFormEmail'), { target: { value: email } });
  fireEvent.change(screen.getByTestId('contactFormMessage'), { target: { value: message } });
};

test('renders the contact form fields', () => {
  render(<ContactForm />);

  expect(screen.getByTestId('contactFormName')).toBeTruthy();
  expect(screen.getByTestId('contactFormEmail')).toBeTruthy();
  expect(screen.getByTestId('contactFormMessage')).toBeTruthy();
  expect(screen.getByTestId('contactFormSubmit')).toBeTruthy();
});

test('shows an error when required fields are missing', async () => {
  render(<ContactForm />);

  fireEvent.click(screen.getByTestId('contactFormSubmit'));

  expect(await screen.findByText('Please fill out all fields')).toBeTruthy();
  expect(global.fetch).not.toHaveBeenCalled();
});

test('shows an error when the email is invalid', async () => {
  render(<ContactForm />);

  fillForm({ name: 'Jane Doe', email: 'not-an-email', message: 'Hello there' });
  fireEvent.click(screen.getByTestId('contactFormSubmit'));

  expect(await screen.findByText('Please enter a valid email address')).toBeTruthy();
  expect(global.fetch).not.toHaveBeenCalled();
});

test('submits the form and shows a success message', async () => {
  global.fetch.mockResolvedValueOnce({ ok: true });
  render(<ContactForm />);

  fillForm({ name: 'Jane Doe', email: 'jane@example.com', message: 'Hello there' });
  fireEvent.click(screen.getByTestId('contactFormSubmit'));

  await waitFor(() => {
    expect(screen.getByTestId('contactFormSuccess')).toBeTruthy();
  });
  expect(global.fetch).toHaveBeenCalledWith(
    '/api/contact',
    expect.objectContaining({ method: 'POST' })
  );
});

test('shows an error message when the request fails', async () => {
  global.fetch.mockResolvedValueOnce({ ok: false });
  render(<ContactForm />);

  fillForm({ name: 'Jane Doe', email: 'jane@example.com', message: 'Hello there' });
  fireEvent.click(screen.getByTestId('contactFormSubmit'));

  expect(await screen.findByTestId('contactFormError')).toBeTruthy();
});
