import '@testing-library/jest-dom/vitest';

// jsdom implements neither ResizeObserver nor canvas rendering. Components
// across the visuals/ labs construct a ResizeObserver in a layout effect, so
// without a stub every render throws before any assertion runs.
class ResizeObserverStub implements ResizeObserver {
    observe(): void {}
    unobserve(): void {}
    disconnect(): void {}
}

if (!('ResizeObserver' in globalThis)) {
    globalThis.ResizeObserver = ResizeObserverStub;
}
