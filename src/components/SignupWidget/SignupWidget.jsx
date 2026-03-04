'use client';

import PropTypes from 'prop-types';
import { useState } from 'react';

const SignupWidget = ({ title, content, simulateNetworkRequestTime }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [busy, setBusy] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    if (!/\S+@\S+\.\S+/.test(email)) {
      setErrorMessage('Please enter a valid email address');
      return;
    }
    try {
      setBusy(true);
      await new Promise((resolve) => setTimeout(resolve, simulateNetworkRequestTime));
      setMessage(`You're in! Check ${email} for a confirmation.`);
      setIsSubscribed(true);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div
      data-testid="signupWidget"
      className="card-modern flex flex-col p-6 w-full max-w-[380px] gap-4"
    >
      <div>
        <h2
          data-testid="signupWidgetTitle"
          className="m-0 text-lg font-bold text-zinc-800 dark:text-white tracking-tight"
        >
          {title}
        </h2>
        <p
          data-testid="signupWidgetContent"
          className="text-sm text-zinc-400 dark:text-zinc-500 mt-1"
        >
          {content}
        </p>
      </div>

      {isSubscribed ? (
        <div className="flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl px-4 py-3">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M3 8L6.5 11.5L13 4.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p data-testid="signupWidgetMessage" className="m-0">
            {message}
          </p>
        </div>
      ) : (
        <>
          <div className="flex flex-row gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrorMessage('');
              }}
              placeholder="your@email.com"
              disabled={busy || isSubscribed}
              data-testid="signupWidgetInput"
              required
              className="flex-1 px-3.5 py-2.5 text-sm border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-100 rounded-xl placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-amber-400/30 focus:border-amber-400 transition-all"
            />
            <button
              type="submit"
              data-testid="signupWidgetButton"
              disabled={busy || isSubscribed}
              onClick={handleSubmit}
              className="px-4 py-2.5 text-sm font-semibold rounded-xl bg-amber-500 text-zinc-900 hover:bg-amber-400 active:scale-[0.97] disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-150"
            >
              {busy ? '...' : 'Join'}
            </button>
          </div>
          {errorMessage && (
            <p className="text-red-500 dark:text-red-400 text-xs mt-0.5">{errorMessage}</p>
          )}
        </>
      )}
    </div>
  );
};

SignupWidget.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  simulateNetworkRequestTime: PropTypes.number.isRequired,
};
export default SignupWidget;
