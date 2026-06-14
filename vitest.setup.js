import '@testing-library/jest-dom';

// jsdom doesn't implement IntersectionObserver, which motion's
// `whileInView` relies on to detect scroll-triggered animations.
class MockIntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

global.IntersectionObserver = MockIntersectionObserver;
