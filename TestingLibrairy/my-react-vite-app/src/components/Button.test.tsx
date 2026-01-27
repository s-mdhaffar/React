import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
// Ensure jest-dom matchers are available globally
import '@testing-library/jest-dom';
import Button from './Button';
import { vi } from 'vitest';

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
