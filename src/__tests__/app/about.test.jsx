import { render } from '@testing-library/react';
import { expect, test } from 'vitest';
import About from '../../app/about/page.jsx';

test('about page renders without crashing', () => {
  expect(() => render(<About />)).not.toThrow();
});
