import { render } from '@testing-library/react';
import { expect, test } from 'vitest';
import Uses from '../../app/uses/page.jsx';

test('uses page renders without crashing', () => {
  expect(() => render(<Uses />)).not.toThrow();
});
