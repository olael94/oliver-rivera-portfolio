import { render } from '@testing-library/react';
import { expect, test } from 'vitest';
import Projects from '../../app/projects/page.jsx';

test('projects page renders without crashing', () => {
  expect(() => render(<Projects />)).not.toThrow();
});
