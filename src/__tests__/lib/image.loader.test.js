import { expect, test } from 'vitest';
import myImageLoader from '../../lib/image.loader.js';

test('prepends /portfolio to the src path', () => {
  expect(myImageLoader({ src: '/images/profile.jpg' })).toBe('/portfolio/images/profile.jpg');
});

test('works with nested paths', () => {
  expect(myImageLoader({ src: '/icons/github.png' })).toBe('/portfolio/icons/github.png');
});
