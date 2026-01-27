import { render, screen, fireEvent } from '@testing-library/react';
// Ensure jest-dom matchers are available globally
import '@testing-library/jest-dom';
import Button from './Button';
import { describe, it, vi } from 'vitest';

describe('Button', () => {
  it('renders the button with children', () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);
    fireEvent.click(screen.getByText('Click Me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
// The expect function is already provided by the testing framework (jest or vitest) and imported globally.
// You do not need to implement it manually. You can safely remove this function.
// If you want to provide a minimal implementation for demonstration purposes, you could do:

export function expect(received: any) {
  return {
    toBeInTheDocument: () => {
      // Dummy implementation for demonstration
      if (!received) {
        throw new Error('Element not found in the document.');
      }
    },
    toHaveBeenCalledTimes: (times: number) => {
      if (typeof received.mock !== 'object' || received.mock.calls.length !== times) {
        throw new Error(`Function was not called ${times} times.`);
      }
    },
  };
}

