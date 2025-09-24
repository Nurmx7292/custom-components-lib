import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('Button', () => {
  test('renders children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  test('applies variant classes', () => {
    const { rerender } = render(<Button variant="text">Text</Button>);
    const btn = screen.getByRole('button', { name: /text/i });
    expect(btn.classList.contains('button')).toBe(true);
    expect(btn.classList.contains('text')).toBe(true);

    rerender(<Button variant="contained">Contained</Button>);
    const btn2 = screen.getByRole('button', { name: /contained/i });
    expect(btn2.classList.contains('contained')).toBe(true);

    rerender(<Button variant="outlined">Outlined</Button>);
    const btn3 = screen.getByRole('button', { name: /outlined/i });
    expect(btn3.classList.contains('outlined')).toBe(true);
  });

  test('applies size classes', () => {
    const { rerender } = render(<Button size="small">Small</Button>);
    const small = screen.getByRole('button', { name: /small/i });
    expect(small.classList.contains('small')).toBe(true);

    rerender(<Button size="medium">Medium</Button>);
    const medium = screen.getByRole('button', { name: /medium/i });
    expect(medium.classList.contains('medium')).toBe(true);

    rerender(<Button size="large">Large</Button>);
    const large = screen.getByRole('button', { name: /large/i });
    expect(large.classList.contains('large')).toBe(true);
  });

  test('forwards standard button props (disabled, type, onClick)', () => {
    const onClick = jest.fn();
    render(
      <Button disabled type="button" onClick={onClick} className="extra">
        Action
      </Button>
    );
    const btn = screen.getByRole('button', { name: /action/i });
    expect(btn).toBeDisabled();
    expect(btn).toHaveAttribute('type', 'button');
    expect(btn.classList.contains('extra')).toBe(true);

    fireEvent.click(btn);
    expect(onClick).not.toHaveBeenCalled();
  });

  test('calls onClick when enabled', () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick}>Go</Button>);
    fireEvent.click(screen.getByRole('button', { name: /go/i }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});


