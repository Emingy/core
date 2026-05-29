import { rstest } from '@rstest/core';

import '@testing-library/jest-dom';

class ResizeObserverMock {
    observe = rstest.fn();
    unobserve = rstest.fn();
    disconnect = rstest.fn();
}

rstest.stubGlobal('ResizeObserver', ResizeObserverMock);
