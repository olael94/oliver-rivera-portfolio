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
      setMessage(`Thanks for subscribing, ${email}!`);
      setIsSubscribed(true);
    } finally {
      setBusy(false);
    }
  }

  return (
    <form
      data-testid="signupWidget"
      onSubmit={handleSubmit}
      autoComplete="false"
      className="flex flex-col p-6 border border-zinc-100 rounded-2xl shadow-[0_0_10px_rgba(0,0,0,0.1)] w-full max-w-[380px] gap-3 dark:border-zinc-700 dark:shadow-[0_0_10px_rgba(20,184,166,0.4)]"
    >
      <h2
        data-testid="signupWidgetTitle"
        className="m-0 text-2xl font-bold text-zinc-700 dark:text-white"
      >
        {title}
      </h2>
      {isSubscribed ? (
        <p data-testid="signupWidgetMessage" className="text-base text-zinc-500">
          {message}
        </p>
      ) : (
        <>
          <p
            data-testid="signupWidgetContent"
            className="text-base text-zinc-500 dark:text-custom-grey"
          >
            {content}
          </p>
          <div className="flex flex-row gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrorMessage('');
              }}
              placeholder="Enter your email"
              disabled={busy || isSubscribed}
              data-testid="signupWidgetInput"
              required
              className="flex-1 p-2.5 border border-zinc-200 rounded-md"
            />
            <button
              type="submit"
              data-testid="signupWidgetButton"
              disabled={busy || isSubscribed}
              className="px-6 py-0.5 min-w-[42px] text-center rounded-md bg-teal-500 text-white text-sm leading-4 cursor-pointer hover:bg-green-600 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {busy ? 'Joining' : 'Join'}
            </button>
          </div>
          {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
        </>
      )}
    </form>
  );
};

SignupWidget.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  simulateNetworkRequestTime: PropTypes.number.isRequired,
};
export default SignupWidget;
