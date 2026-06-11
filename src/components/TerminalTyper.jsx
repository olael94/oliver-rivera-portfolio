'use client';

import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const TYPE_SPEED = 90;
const ERASE_SPEED = 50;
const HOLD_DURATION = 1800;

// Cycles through `lines`, typing each one out, holding, then erasing before
// moving to the next — classic terminal typewriter effect.
const TerminalTyper = ({ lines }) => {
  const [lineIndex, setLineIndex] = useState(0);
  const [text, setText] = useState('');
  const [phase, setPhase] = useState('typing');

  useEffect(() => {
    const current = lines[lineIndex % lines.length];
    let timeout;

    if (phase === 'typing') {
      if (text.length < current.length) {
        timeout = setTimeout(() => setText(current.slice(0, text.length + 1)), TYPE_SPEED);
      } else {
        timeout = setTimeout(() => setPhase('erasing'), HOLD_DURATION);
      }
    } else if (text.length > 0) {
      timeout = setTimeout(() => setText(current.slice(0, text.length - 1)), ERASE_SPEED);
    } else {
      setLineIndex((prev) => (prev + 1) % lines.length);
      setPhase('typing');
    }

    return () => clearTimeout(timeout);
  }, [text, phase, lineIndex, lines]);

  return (
    <span data-testid="terminalTyper" className="break-words">
      {text}
      <span className="ml-0.5 inline-block w-[1px] h-4 bg-current animate-pulse align-middle" />
    </span>
  );
};

TerminalTyper.propTypes = {
  lines: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default TerminalTyper;
