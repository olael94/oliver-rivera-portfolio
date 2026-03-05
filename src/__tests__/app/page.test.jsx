import { render } from '@testing-library/react';
import { expect, test, vi, beforeAll } from 'vitest';
import Home from '../../app/page.jsx';

beforeAll(() => {
  window.matchMedia = vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }));
});

test('home page renders without crashing', () => {
  expect(() => render(<Home />)).not.toThrow();
});
