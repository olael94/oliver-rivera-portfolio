'use client';

import { useState, useEffect } from 'react';

const INITIAL_FORM = { name: '', email: '', message: '' };
const SUCCESS_RESET_DELAY = 5000;

const ContactForm = () => {
  const [form, setForm] = useState(INITIAL_FORM);
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (status !== 'sent') return;
    const timer = setTimeout(() => setStatus('idle'), SUCCESS_RESET_DELAY);
    return () => clearTimeout(timer);
  }, [status]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrorMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.message.trim()) {
      setErrorMessage('Please fill out all fields');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(form.email)) {
      setErrorMessage('Please enter a valid email address');
      return;
    }

    try {
      setStatus('sending');
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error('Failed to send');

      setStatus('sent');
      setForm(INITIAL_FORM);
    } catch {
      setStatus('error');
      setErrorMessage('Something went wrong. Please try again later.');
    }
  };

  if (status === 'sent') {
    return (
      <div
        data-testid="contactFormSuccess"
        className="card-modern flex flex-col items-center justify-center text-center gap-3 p-8 w-full min-h-[320px]"
      >
        <div className="neu-icon flex items-center justify-center w-12 h-12 rounded-full">
          <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
            <path
              d="M3 8L6.5 11.5L13 4.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-lime-500"
            />
          </svg>
        </div>
        <p className="m-0 text-lg font-bold text-zinc-800 dark:text-white">Message sent!</p>
        <p className="m-0 text-sm text-zinc-500 dark:text-zinc-400">
          Thanks for reaching out — I&rsquo;ll get back to you soon.
        </p>
      </div>
    );
  }

  return (
    <form
      data-testid="contactForm"
      onSubmit={handleSubmit}
      noValidate
      className="card-modern flex flex-col gap-5 p-6 sm:p-8 w-full"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="contact-name"
            className="text-sm font-semibold text-zinc-600 dark:text-zinc-300"
          >
            Full Name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            placeholder="John Doe"
            disabled={status === 'sending'}
            suppressHydrationWarning
            data-testid="contactFormName"
            className="neu-input rounded-xl px-4 py-3 text-sm text-zinc-800 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="contact-email"
            className="text-sm font-semibold text-zinc-600 dark:text-zinc-300"
          >
            Email Address
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="john@example.com"
            disabled={status === 'sending'}
            suppressHydrationWarning
            data-testid="contactFormEmail"
            className="neu-input rounded-xl px-4 py-3 text-sm text-zinc-800 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="contact-message"
          className="text-sm font-semibold text-zinc-600 dark:text-zinc-300"
        >
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={6}
          value={form.message}
          onChange={handleChange}
          placeholder="Tell me about your project or just say hi!"
          disabled={status === 'sending'}
          suppressHydrationWarning
          data-testid="contactFormMessage"
          className="neu-input rounded-xl px-4 py-3 text-sm text-zinc-800 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 resize-y"
        />
      </div>

      {errorMessage && (
        <p data-testid="contactFormError" className="text-red-500 dark:text-red-400 text-sm">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        data-testid="contactFormSubmit"
        className="self-start inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-lime-500 hover:bg-lime-400 active:bg-lime-600 text-[#0c0a07] font-semibold text-sm tracking-wide transition-all duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
        style={{ fontFamily: 'var(--font-syne)' }}
      >
        {status === 'sending' ? 'Sending…' : 'Send Message'}
        <span aria-hidden="true">→</span>
      </button>
    </form>
  );
};

export default ContactForm;
